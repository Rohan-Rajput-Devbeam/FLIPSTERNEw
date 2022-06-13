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
	displayFlag: any;
	displayLoader: any;
}

export default class AtlasFlipsterConnect extends React.Component<IAtlasFlipsterConnectProps, IAtlasFlipsterConnectState> {

	private SPService: SPService = null;
	constructor(props) {
		super(props);
		this.SPService = new SPService(this.props.context);
		this.state = ({
			parentItems: [],
			childItems: [],
			displayFlag: false,
			displayLoader: true,
		})
	}
	componentDidMount() {
		let el = $('.my-flipster');
		this.jQueryFlipsterFunction();
		// el.flipster(); 
		// console.log($('.my-flipster'))

		this.props.Category == undefined ? this.props.Category == "American" : console.log("Value+" + this.props.Category)
		// this.getUniqueLanguages();
		console.log("Start Loader")
		this.setState({
			displayLoader: true
		})
		this.getParentItems();
	}

	@autobind
	public jQueryFlipsterFunction() {
		console.log('all done');
		$('.my-flipster').flipster({
			style: 'carousel',
			loop: true,
			buttons: 'custom',

			nav: "true",

			spacing: -0.30,
			buttonPrev: '<span  style="color:#CC0A0A;font-size:100px;font-weight: bold;font-family: monospace;" > <</span>',

			buttonNext: '<span  style="color:#CC0A0A;font-size:100px;font-weight: bold;font-family: monospace;"> ></span>',
		});
	}

	@autobind
	async getParentItems() {
		var itemsProcessed = 0;
		let parentBrandArray = await this.SPService.getparentBrand(this.props.Category)
		console.log(parentBrandArray);
		this.setState({
			parentItems: parentBrandArray
		})
		for (let i = 0; i < parentBrandArray.length; i++) {
			itemsProcessed++;
			console.log(parentBrandArray[i].Title)
			await this.getChild(parentBrandArray[i].LinkID, parentBrandArray[i].Title, itemsProcessed)
		}
		// parentBrandArray.forEach(element => {
		// 	itemsProcessed++;
		// 	this.getChild(element.LinkID, itemsProcessed)

		// 	if (itemsProcessed === parentBrandArray.length) {
		// 		this.callback();
		// 	}
		// });
	}

	@autobind
	public async getChild(linkID: string, linkName: string, counter: number) {
		let currentChildItems = this.state.childItems ? this.state.childItems : [];
		let childItems = await this.SPService.getChildBrands(linkID);
		console.log(linkID, linkName, childItems)
		console.log(currentChildItems)
		currentChildItems.push(childItems)
		console.log(currentChildItems)
		await this.setState({
			childItems: currentChildItems
		}, () => {
			if (counter === this.state.parentItems.length) {
				console.log("Stop Loader")
				this.jQueryFlipsterFunction();
				this.setState({
					displayLoader: false
				})
			}
		})
		console.log(this.state.childItems)
	}

	// @autobind
	// public async getChild(linkID: string, counter: number) {
	// 	let currentChildItems = this.state.childItems;
	// 	let childItems = await this.SPService.getChildBrands(linkID);
	// 	console.log(childItems)
	// 	currentChildItems.push(childItems)
	// 	this.setState({
	// 		childItems: currentChildItems
	// 	}, () => {
	// 		if (counter === this.state.parentItems.length) {
	// 			console.log("lolololo")
	// 			this.callback();
	// 		}
	// 	})
	// }

	public render(): React.ReactElement<IAtlasFlipsterConnectProps> {

		return (
			<>

				{
					this.props.Category == null || this.props.Category == '' ?
						<div>Please select a valid category!</div> :

						<div className={styles.atlasFlipsterConnect}>
							<div className={styles.containter21}>
								<div className="my-flipster">
									<ul>

										{this.state.parentItems.map((parentItem: any, i: any) => (

											this.state.childItems[i] ?
												this.state.childItems[i].map((childItem: any, j: any) => (

													<li data-flip-title={childItem.Title} data-flip-category={parentItem.Title}>
														<a target="_blank" data-interception="off" rel="noopener noreferrer" href={`https://bgsw1.sharepoint.com/sites/CONNECTII/SitePages/${childItem.LinkID}.aspx`}>
															<div className={styles.textontheimage1} >{childItem.Title}<span style={{ color: "#cc0a0a", fontSize: "35px" }}> {' >'}</span>

															</div>
															<div className={styles.ImageContainer}>
																<img className={styles.ImageClass} src={childItem.BrandImage.Url} />
															</div>
														</a>
													</li>


												))
												: null

										))}
									</ul>
								</div>
							</div>
						</div >



				}
			</>
		);
	}
}
