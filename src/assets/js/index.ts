import '../css/index.css';
import './config/bootstrap.ts';
import {prompt} from './component/dialog/prompt.ts';

var button:HTMLInputElement = <HTMLInputElement>document.getElementById('button');

button.onclick = (e) => {
    prompt('内容', '标题', e);
};
