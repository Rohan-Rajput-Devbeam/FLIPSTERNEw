import * as React from 'react';
import styles from './AtlasFlipsterConnect.module.scss';
import { IAtlasFlipsterConnectProps } from './IAtlasFlipsterConnectProps';
import { SPService } from '../Services/SPServices';

import { escape } from '@microsoft/sp-lodash-subset';
import * as $ from "jquery";
import 'jquery.flipster/dist/jquery.flipster.min.css'
import "jquery.flipster/dist/jquery.flipster.min.js"
import "jquery.flipster/dist/jquery.flipster.css"

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
// require('../../../node_modules/jquery.flipster/dist/jquery.flipster.min.css');
// require('../../../node_modules/jquery.flipster/dist/jquery.flipster.min.js');
import "jquery.flipster"
import "bootstrap"
import autobind from 'autobind-decorator';

// require('jquery.flipster');
// require('../../../node_modules/jquery/dist/jquery.min.js');
// require('../../../node_modules/bootstrap/dist/js/bootstrap.min.js');
// require('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');

// require('../../../node_modules/jquery.flipster/dist/jquery.flipster.min.js');
// require('../../../node_modules/jquery.flipster/dist/jquery.flipster.min.css');

export interface IAtlasFlipsterConnectState {
	parentItems: any;
	childItems: any;
}

export default class AtlasFlipsterConnect extends React.Component<IAtlasFlipsterConnectProps, IAtlasFlipsterConnectState> {


	private SPService: SPService = null;
	constructor(props) {
		super(props);
		this.SPService = new SPService(this.props.context);
		this.state = ({
			parentItems: [],
			childItems: []
		})
	}




	componentDidMount() {
		let el = $('.my-flipster');
		// el.flipster(); 
		console.log($('.my-flipster'))
		$('.my-flipster').flipster({

			style: 'carousel',
			loop: true,
			buttons: 'custom',

			nav: "true",

			spacing: -0.23,
			buttonPrev: '<span  style="color:red;font-size:100px;font-weight: bold;font-family: monospace;" > <</span>',

			buttonNext: '<span  style="color:red;font-size:100px;font-weight: bold;font-family: monospace;"> ></span>',


		});
		// this.getUniqueLanguages();
		this.getParentItems();


	}

	@autobind
	async getParentItems() {
		let parentBrandArray = await this.SPService.getparentBrand()
		console.log(parentBrandArray);
		this.setState({
			parentItems: parentBrandArray
		})
	}
	public render(): React.ReactElement<IAtlasFlipsterConnectProps> {

		return (
			<div className={styles.atlasFlipsterConnect}>
				{/* <link rel="stylesheet" href="css/flipster.min.css"></link>

				<script src="/js/jquery.min.js"></script>
				<script src="/js/jquery.flipster.min.js"></script> */}

				<div className={styles.containter21}>
					<div className="my-flipster">
						<ul>

							{this.state.parentItems.map((parentItem: any, i:any) => {
								// <div>{parentItem.Title}</div>
								<li data-flip-title={parentItem.Title} data-flip-category={parentItem.Title}>
								<a href="https://bgsw1.sharepoint.com/sites/CONNECTII/SitePages/${brandArray[i].LinkID}.aspx">
									<div className={styles.textontheimage1} >American Whiskey<button className={styles.button} type="button" ><span style={{ color: "red", fontSize: "35px" }}> {'>'}</span></button>

									</div>

									<div className={styles.ImageContainer}>
										<img className={styles.ImageClass} src="https://bgsw1.sharepoint.com/sites/CONNECTII/_layouts/15/guestaccess.aspx?share=E4NnzjCLCyhCouNjM0Se2ckB97ZeNxsZTDc8LuLVDI5BcA&e=06rWCZ" />
									</div>
								</a>
							</li>
								{ console.log(parentItem.Title) }
							})}

							{/* {this.state.parentItems.map(function (obj: { Title: any; }) {
								console.log(obj.Title)

								return obj.Title;
							})}
						 */}







						</ul>
					</div>
				</div>


			</div >
		);
	}
}
