/**
 * Block dependencies
 */
import icon from './icon';
import './editor.scss';
import './style.css';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
    registerBlockType,
} = wp.blocks;
const {
    Editable,
    MediaUpload,
    MediaUploadCheck,
    BlockControls,
    InspectorControls,
    RichText,
    URLInput,
} = wp.blockEditor;
const {
    Button,
    SelectControl,
    RadioControl,
    Panel,
    PanelBody,
    PanelRow,
    TextControl,
    TextareaControl,
} = wp.components;
const { Fragment } = wp.element;

/**
 * Register example block
 */
export default registerBlockType(
    'cgb/board',
    {
        title: __( 'Board Card', 'clb_board' ),
        description: __( 'Add a Board Card to your content ', 'clb_board'),
        category: 'common',
        parent: ['cgb/boardcollection'],
	   icon: {
	        foreground: '#fff',
	        background: '#3883d6',
	        src: icon,
	   },
        keywords: [ __( 'card' ), __( 'board' ), __( 'chair' ) ],
        attributes: {
            imgURL: {
                type: 'string',
            },
            imgID: {
                type: 'number',
            },
            imgAlt: {
                type: 'string',
                source: 'attribute',
                attribute: 'alt',
                selector: 'img',
           },
          cardName: {
			source: 'html',
			selector: '.clb-card__name',
		},
          cardTitle: {
			source: 'html',
			selector: '.clb-card__title',
			// default: __( 'Card Title' ),
		},
          cardBody: {
			source: 'html',
			selector: '.clb-card__body',
		},
        },
        edit: props => {
            const { attributes: { imgID, imgURL, imgAlt, cardType, cardTitle, cardName, cardBody },
                className, setAttributes, isSelected } = props;
            const onSelectImage = img => {
                setAttributes( {
                    imgID: img.id,
                    imgURL: img.url,
                    imgAlt: img.alt,
                } );
            };
            const onRemoveImage = () => {
                setAttributes({
                    imgID: null,
                    imgURL: null,
                    imgAlt: null,
                });
            }

            const onChangeName = cardName => { setAttributes( { cardName } ) };
            const onChangeTitle = cardTitle => { setAttributes( { cardTitle } ) };
            const onChangeBody = cardBody => { setAttributes( { cardBody } ) };
            const onChangeButtonText = buttonText => { setAttributes( { buttonText } ) };

            return (
			  <Fragment>
                 <InspectorControls>
                   <PanelBody
                       title={ __( 'Card Settings', 'clb_board' ) }
                   >
                   </PanelBody>
               </InspectorControls>

			 <div className={ className }>

                    { ! imgID ? (

                         <Fragment>
					<MediaUploadCheck>
	                        <MediaUpload
	                            onSelect={ onSelectImage }
	                            type="image"
	                            value={ imgID }
	                            render={ ( { open } ) => (
	                                <Button
	                                    className={ "button button-large" }
	                                    onClick={ open }
	                                >
	                                    { __( 'Upload Board Member Image', 'clb_board' ) }
	                                </Button>
	                            ) }
	                        >
	                        </MediaUpload>
				    </MediaUploadCheck>

                        <TextControl
                            className='clb-card__name'
                            label={ 'Board Member Name' }
                            value={ cardName }
                            placeholder={ 'Board Member Name' }
                            onChange={ onChangeName }
                       />

                        <TextControl
                            className='clb-card__title'
                            label={ 'Board Member Title (Optional)' }
                            value={ cardTitle }
                            placeholder={ 'Board Member Title (Optional)' }
                            onChange={ onChangeTitle }
                       />

                       <RichText
                          className='clb-card__body'
                          label={ 'Board Member Info' }
                          allowedFormats={ [ 'core/bold', 'core/italic' ] }
                          value={ cardBody }
                          placeholder={ 'Enter Board Member additional information here...' }
                          onChange={ onChangeBody }
                     />


                       </Fragment>

                    ) : (

                         <div className ={ className }>

                         { isSelected ? (

                            <div className ={ className + "-selected" } >

                                <img
                                   src={ imgURL }
                                   alt={ imgAlt }
                                   className = "card-selected-image"
                                />

                                 <MediaUploadCheck>
                                    <MediaUpload
                                         onSelect={ onSelectImage }
                                         type="image"
                                         value={ imgID }
                                         render={ ( { open } ) => (
                                             <Button
                                                className={ "button button-large" }
                                                onClick={ open }
                                             >
                                                { __( 'Change Board Member Image', 'clb_board' ) }
                                             </Button>
                                         ) }
                                    >
                                    </MediaUpload>
                               </MediaUploadCheck>

                               <TextControl
                                   className='clb-card__name'
                                   label={ 'Board Member Name' }
                                   value={ cardName }
                                   placeholder={ 'Board Member Name' }
                                   onChange={ onChangeName }
                              />

                               <TextControl
                                   className='clb-card__title'
                                   label={ 'Board Member Title (Optional)' }
                                   value={ cardTitle }
                                   placeholder={ 'Board Member Title (Optional)' }
                                   onChange={ onChangeTitle }
                              />

                              <RichText
                                 className='clb-card__body'
                                 label={ 'Board Member Info' }
                                 value={ cardBody }
                                 placeholder={ 'Enter Board Member information here...' }
                                 onChange={ onChangeBody }
                            />

                            </div>

                            ) : (

                                 <div className="clb-card-static">
                                      <img
                                        src={ imgURL }
                                        alt={ imgAlt }
                                        className = "card-static-image"
                                     />
                                     <div><strong>{cardName}</strong></div>
                                     <div>{cardTitle}</div>
                                     <RichText.Content tagName="div" className="clb-card__body" value={ cardBody } />
                                </div>

                            ) }

                            </div>

                    )}

                </div>
			 </Fragment>
            );
        },
        save: props => {
            const { imgID, imgURL, imgAlt, cardType, cardTitle, cardName, cardBody } = props.attributes;

            return (

                 <div className={"interactive-card single-board" + ' card-' + cardType}>

                      <Fragment>
                              <img
                                 src={ imgURL }
                                 alt={ imgAlt }
                              />
                              <div className="board-card-body">
                                   <h4 className="clb-card__name">{cardName}</h4>
                                   <div className="clb-card__title">{cardTitle}</div>
                                   <RichText.Content tagName="div" className="clb-card__body" value={ cardBody } />
                              </div>
                    </Fragment>

                </div>
            );
        },
    },
);
