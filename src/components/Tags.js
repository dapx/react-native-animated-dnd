// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  LayoutAnimation,
} from 'react-native';
import TagsArea from './TagsArea';
import type { TagObject } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

type Props = {
  // Array of tag titles
  tags: string[],
  animationDuration: number,
  // Passes onPressAddNewTag callback down to TagsArea component
  onPressAddNewTag: () => void,
};

type State = {
  tags: TagObject[],
};

export default class Tags extends PureComponent<Props, State> {
  props: Props;

  static defaultProps = {
    animationDuration: 250,
  };

  state: State = {
    // Convert passed array of tag titles to array of objects of TagObject type,
    // so ['tag', 'another'] becomes [{ title: 'tag' }, { title: 'another' }]
    tags: [...new Set(this.props.tags)] // remove duplicates
      .map((title: string) => ({ title })), // convert to objects
  };

  // Animate layout changes when dragging or removing a tag
  componentWillUpdate() {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: this.props.animationDuration,
    });
  }

  render() {
    const { tags } = this.state;
    return (
      <View
        style={styles.container}
      >

        <TagsArea
          tags={tags}
          onPress={() => {}} // do nothing for now
          onRenderTag={() => {}} // do nothing for now
          onPressAddNew={this.props.onPressAddNewTag}
        />

      </View>
    );
  }
}
