import React, {Component} from 'react';

import AceEditor from 'react-ace';

import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';


const styles = {
  container: {
    height: '100%'
  }
};


class CodeEditor extends Component {

  render() {

    let {code, onCodeChange, width, height, isEmbed} = this.props;

    return (
      <div style={styles.container}>
        <AceEditor
          mode="javascript"
          theme="tomorrow"
          onChange={onCodeChange}
          name="example"
          width={`${width}px`}
          height={`${height}px`}
          value={code}
          showGutter={isEmbed ? false : true}
          editorProps={{
            $blockScrolling: Infinity
          }}
          setOptions={{
            fontSize: isEmbed ? 14 : 12
          }}
        />
      </div>
    )
  }
}

export default CodeEditor;
