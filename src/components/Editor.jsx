import React, { useEffect } from 'react';
import Codemirror from 'codemirror';

// importing mode 
import 'codemirror/mode/javascript/javascript';
// importing mode options
import'codemirror/addon/edit/closetag';
import'codemirror/addon/edit/autoCloseBrackets';
import'codemirror/addon/edit/lineNumbers';

// importing theme 
import 'codemirror/theme/dracula.css';


const Editor = () => {
  useEffect(()=>{
    async function init(){
        Codemirror.fromTextArea(
            document.getElementById('realTimeEditor'),
            {
                mode:{name:'javascript',json:true},
                theme: 'dracula',
                autoCloseTags:true,
                autoCloseBrackets:true,
                lineNumbers: true,
            }
        );
    }
    init();
  },[])

  return (
    <textarea name="" id="realTimeEditor"></textarea>
  )
}

export default Editor