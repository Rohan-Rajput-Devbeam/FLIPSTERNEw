import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AtlasFlipsterConnectWebPartStrings';
import AtlasFlipsterConnect from './components/AtlasFlipsterConnect';
import { IAtlasFlipsterConnectProps } from './components/IAtlasFlipsterConnectProps';

export interface IAtlasFlipsterConnectWebPartProps {
  description: string;
  Category: string;
}

export default class AtlasFlipsterConnectWebPart extends BaseClientSideWebPart<IAtlasFlipsterConnectWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAtlasFlipsterConnectProps> = React.createElement(
      AtlasFlipsterConnect,
      {
        description: this.properties.description,
        context: this.context,
        Category:this.properties.Category
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),

                PropertyPaneDropdown('Category', {
                  label: 'Category',
                  options: [
                    { key: 'American', text: 'American' },
                    { key: 'International', text: 'International' },
                    { key: 'Global', text: 'Global' },


                  ],
                  selectedKey: 'American',
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
