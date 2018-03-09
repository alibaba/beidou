import React from 'react';

import { Mention, Popover, Button } from 'antd';

const { toString, toContentState } = Mention;

function onChange(editorState) {
  console.log(toString(editorState));
}

function onSelect(suggestion) {
  console.log('onSelect', suggestion);
}

class PopoverContainer extends React.Component {
  getSuggestionContainer = () => this.popover.getPopupDomNode();
  visibleChange = (visible) => {
    if (visible && this.mention) {
      this.mention.focus();
    }
  };
  render() {
    const mention = (
      <Mention
        ref={ele => (this.mention = ele)}
        style={{ width: '100%' }}
        onChange={onChange}
        defaultValue={toContentState('@afc163')}
        suggestions={[
          'afc163',
          'benjycui',
          'yiminghe',
          'RaoHai',
          '中文',
          'にほんご',
        ]}
        onSelect={onSelect}
        getSuggestionContainer={this.getSuggestionContainer}
      />
    );
    return (
      <Popover
        trigger="click"
        content={mention}
        title="Title"
        ref={popover => (this.popover = popover)}
        onVisibleChange={this.visibleChange}
      >
        <Button type="primary">Click Me</Button>
      </Popover>
    );
  }
}

export default PopoverContainer;
