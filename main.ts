import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface htmlMdScPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: htmlMdScPluginSettings = {
	mySetting: 'default'
}

export default class htmlMdScPlugin extends Plugin {
	settings: htmlMdScPluginSettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('highlight-glyph', 'HTML Markdown Shortcuts', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('This is a notice!');
			new ColorPickerModal(this.app).open();
		});

		// Perform additional things with the ribbon
		ribbonIconEl.addClass('html-md-sc-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-color-picker',
			name: 'Open Color Picker',
			// callback: () => {
			// 	new ColorPickerModal(this.app, (result) => {
			// 		new Notice(`Hello, ${result}!`);
			// 	}).open();
			// }
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="lined"><span class="cX"><label for="colorPicker" popovertarget="colorPicker" style="cursor:pointer;">Show Color Palette</label><input type="color" popover value="#1e1e1e" onchange="setTimeout(function (){document.querySelector(\'body\').style.background = document.getElementById(\'myheader\').value;}, 50);" id="colorPicker" style="display:none;"></span></span>\n');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-0));
				new ColorPickerModal(this.app, (result) => {
					new Notice(`Hello, ${result}!`);
				}).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		// this.addCommand({
		// 	id: 'sample-editor-command',
		// 	name: 'Sample editor command',
		// 	editorCallback: (editor: Editor, view: MarkdownView) => {
		// 		console.log(editor.getSelection());
		// 		editor.replaceSelection('Sample Editor Command');
		// 	}
		// });
		this.addCommand({
			id: 'demo',
			name: 'Demo',
			hotkeys: [{modifiers: ['Mod', 'Alt', 'Shift'], key: 'd'}],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				editor.replaceSelection('<span class="glow">Text</span>\n<span class="dance">Text</span>\n<span class="fade">Text</span>\n<span class="lined X">Text</span>\n<span class="bounce">Text</span>\n<span class="highlight R">Text</span>  <span class="cR">Text</span> <span class="boxR">Text</span>\n<span class="highlight O">Text</span>  <span class="cO">Text</span> <span class="boxO">Text</span>\n<span class="highlight Y">Text</span>  <span class="cY">Text</span> <span class="boxY">Text</span>\n<span class="highlight L">Text</span>  <span class="cL">Text</span> <span class="boxL">Text</span>\n<span class="highlight G">Text</span>  <span class="cG">Text</span> <span class="boxG">Text</span>\n<span class="highlight U">Text</span>  <span class="cU">Text</span> <span class="boxU">Text</span>\n<span class="highlight A">Text</span>  <span class="cA">Text</span> <span class="boxA">Text</span>\n<span class="highlight Z">Text</span>  <span class="cZ">Text</span> <span class="boxZ">Text</span>\n<span class="highlight B">Text</span>  <span class="cB">Text</span> <span class="boxB">Text</span>\n<span class="highlight V">Text</span>  <span class="cV">Text</span> <span class="boxV">Text</span>\n<span class="highlight F">Text</span>  <span class="cF">Text</span> <span class="boxF">Text</span>\n<span class="highlight M">Text</span>  <span class="cM">Text</span> <span class="boxM">Text</span>\n<span class="highlight W">Text</span>  <span class="cW">Text</span> <span class="boxW">Text</span>\n<span class="highlight W K">Text</span>  <span class="cW cK">Text</span> <span class="boxWK">Text</span>\n<span class="highlight K">Text</span>  <span class="cK">Text</span> <span class="boxK">Text</span>\n<span class="highlight X">Text</span>  <span class="cX">Text</span> <span class="boxX">Text</span>\n<span class="popUp"><span class="popTxt">A greeting</span>Hello</span>\n<span class="popUp highlight R"><span class="popTxt"><span class="lined"><span class=\'cR\'>R</span><span class=\'cO\'>O</span><span class=\'cY\'>Y</span><span class=\'cL\'>L</span><span class=\'cG\'>G</span><span class=\'cU\'>U</span><span class=\'cA\'>A</span><span class=\'cZ\'>Z</span><span class=\'cB\'>B</span><span class=\'cV\'>V</span><span class=\'cF\'>F</span><span class=\'cM\'>M</span><span class=\'cW\'>W</span><span class=\'cK\'>K</span> <span class=\'cW cK\'>WK</span></span></span>A random mix, maybe. Not really? I don\'t know!</span>\n<span class="glow keepColor"> keepColor</span> <span class="dance keepColor"> keepColor</span> <span class="fade keepColor"> keepColor</span> <span class="lined keepColor">keepColor</span> <span class="bounce keepColor"> keepColor</span> <span class="highlight R keepColor">keepColor</span>  <span class="cR keepColor">keepColor</span>\n<span class="boxL">Hello text</span> <span class="boxZ highlight V">Hello text</span> <span class="boxL cR">Hello text</span> <span class="boxR cG highlight B">Hello text</span>\n- <span id="help"></span><hr id="x">\n---\n');
				new Notice('Showing Demo!');
			}
		});
		this.addCommand({
			id: 'bold',
			name: 'Bold',
			hotkeys: [{modifiers: ['Mod', 'Shift'], key: 'b'}],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<b>'+selection+'</b>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-4)); // move cursor 4 places back
			}
		});
		this.addCommand({
			id: 'italic',
			name: 'Italic',
			hotkeys: [{modifiers: ['Mod', 'Shift'], key: 'i'}],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<i>'+selection+'</i>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-4)); // move cursor 4 places back
			}
		});
		this.addCommand({
			id: 'underline',
			name: 'Underline',
			hotkeys: [{modifiers: ['Mod', 'Shift'], key: 'u'}],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<u>'+selection+'</u>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-4));
			}
		});
		this.addCommand({
			id: 'strikethrough',
			name: 'Strikethrough',
			hotkeys: [{modifiers: ['Mod', 'Shift'], key: 'q'}],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<del>'+selection+'</del>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-6));
			}
		});
		this.addCommand({
			id: 'horizontal-rule',
			name: 'Horizontal Rule',
			hotkeys: [{modifiers: ['Mod', 'Alt', 'Shift'], key: '-'}],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<hr id="x">');
			}
		});
		this.addCommand({
			id: 'center-text',
			name: 'Center',
			hotkeys: [{modifiers: ['Mod', 'Shift'], key: ' '}],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<center>'+selection+'</center>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-9));
			}
		});
		this.addCommand({
			id: 'color-hex',
			name: 'Color Hex',
			hotkeys: [{modifiers: ['Mod', 'Alt', 'Shift'], key: 'c'}],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span style="color:#;">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-selection.length-10));
			}
		});
		this.addCommand({
			id: 'color-class',
			name: 'Color Class',
			hotkeys: [{modifiers: ['Mod', 'Shift'], key: 'c'}],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="c">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-selection.length-9));
			}
		});
		this.addCommand({
			id: 'color-class-r',
			name: 'Color Class Red',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="cR">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'color-class-o',
			name: 'Color Class Orange',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="cO">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'color-class-y',
			name: 'Color Class Yellow',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="cY">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'color-class-l',
			name: 'Color Class Lime',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="cL">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'color-class-g',
			name: 'Color Class Green',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="cG">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'color-class-u',
			name: 'Color Class Aquamarine',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="cU">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'color-class-a',
			name: 'Color Class Electric',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="cA">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'color-class-z',
			name: 'Color Class Azure',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="cZ">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'color-class-b',
			name: 'Color Class Blue',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="cB">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'color-class-v',
			name: 'Color Class Violet',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="cV">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'color-class-f',
			name: 'Color Class Fuchsia',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="cF">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'color-class-m',
			name: 'Color Class Magenta',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="cM">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'color-class-w',
			name: 'Color Class White',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="cW">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'color-class-wk',
			name: 'Color Class Gray',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="cWK">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'color-class-k',
			name: 'Color Class Black',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="cK">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'color-class-x',
			name: 'Color Class Rainbow',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="cX">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});

		this.addCommand({
			id: 'assistance',
			name: 'Help',
			hotkeys: [{modifiers: ['Mod', 'Alt', 'Shift'], key: 'h'}],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<center id="help">'+selection+'</center>.');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-0));
			}
		});

		this.addCommand({
			id: 'pop-hover',
			name: 'Pop Up Text',
			hotkeys: [{modifiers: ['Mod', 'Shift'], key: 'p'}],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="popUp"><span class="popTxt"></span>'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-selection.length-14));
			}
		});

		this.addCommand({
			id: 'highlight-class',
			name: 'Highlight Class',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="highlight ">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-selection.length-9));
			}
		});
		this.addCommand({
			id: 'highlight-class-r',
			name: 'Highlight Class Red',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="highlight R">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'highlight-class-o',
			name: 'Highlight Class Orange',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="highlight O">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'highlight-class-y',
			name: 'Highlight Class Yellow',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="highlight Y">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'highlight-class-l',
			name: 'Highlight Class Lime',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="highlight L">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'highlight-class-g',
			name: 'Highlight Class Green',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="highlight G">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'highlight-class-u',
			name: 'Highlight Class Aquamarine',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="highlight U">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'highlight-class-a',
			name: 'Highlight Class Electric',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="highlight A">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'highlight-class-z',
			name: 'Highlight Class Azure',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="highlight Z">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'highlight-class-b',
			name: 'Highlight Class Blue',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="highlight B">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'highlight-class-v',
			name: 'Highlight Class Violet',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="highlight V">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'highlight-class-f',
			name: 'Highlight Class Fuchsia',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="highlight F">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'highlight-class-m',
			name: 'Highlight Class Magenta',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="highlight M">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'highlight-class-w',
			name: 'Highlight Class White',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="highlight W">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'highlight-class-wk',
			name: 'Highlight Class Gray',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="highlight WK">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'highlight-class-k',
			name: 'Highlight Class Black',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="highlight K">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'highlight-class-x',
			name: 'Highlight Class Rainbow',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="highlight X">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});

		this.addCommand({
			id: 'box-class',
			name: 'Box Class',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="box">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-selection.length-9));
			}
		});
		this.addCommand({
			id: 'box-class-r',
			name: 'Box Class Red',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="boxR">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'box-class-o',
			name: 'Box Class Orange',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="boxO">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'box-class-y',
			name: 'Box Class Yellow',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="boxY">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'box-class-l',
			name: 'Box Class Lime',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="boxL">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'box-class-g',
			name: 'Box Class Green',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="boxG">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'box-class-u',
			name: 'Box Class Aquamarine',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="boxU">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'box-class-a',
			name: 'Box Class Electric',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="boxA">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'box-class-z',
			name: 'Box Class Azure',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="boxZ">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'box-class-b',
			name: 'Box Class Blue',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="boxB">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'box-class-v',
			name: 'Box Class Violet',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="boxV">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'box-class-f',
			name: 'Box Class Fuchsia',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="boxF">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'box-class-m',
			name: 'Box Class Magenta',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="boxM">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'box-class-w',
			name: 'Box Class White',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="boxW">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'box-class-wk',
			name: 'Box Class Gray',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="boxWK">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'box-class-k',
			name: 'Box Class Black',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="boxK">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'box-class-x',
			name: 'Box Class Rainbow',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="boxX">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});

		this.addCommand({
			id: 'lined-class',
			name: 'Lined Class',
			hotkeys: [{modifiers: ['Mod', 'Alt', 'Shift'], key: 'u'}],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="lined ">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-selection.length-9));
			}
		});
		this.addCommand({
			id: 'lined-class-r',
			name: 'Lined Class Red',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="lined R">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'lined-class-o',
			name: 'Lined Class Orange',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="lined O">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'lined-class-y',
			name: 'Lined Class Yellow',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="lined Y">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'lined-class-l',
			name: 'Lined Class Lime',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="lined L">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'lined-class-G',
			name: 'Lined Class Green',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="lined G">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'lined-class-u',
			name: 'Lined Class Aquamarine',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="lined U">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'lined-class-a',
			name: 'Lined Class Electric',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="lined A">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'lined-class-z',
			name: 'Lined Class Azure',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="lined Z">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'lined-class-b',
			name: 'Lined Class Blue',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="lined B">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'lined-class-v',
			name: 'Lined Class Violet',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="lined V">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'lined-class-f',
			name: 'Lined Class Fuchsia',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="lined F">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'lined-class-m',
			name: 'Lined Class Magenta',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="lined M">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'lined-class-w',
			name: 'Lined Class White',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="lined W">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'lined-class-wk',
			name: 'Lined Class Gray',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="lined WK">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'lined-class-k',
			name: 'Lined Class Black',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="lined K">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'lined-class-x',
			name: 'Lined Class Rainbow',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="lined X">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});

		this.addCommand({
			id: 'glow-class',
			name: 'Glow Class',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="glow">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'dance-class',
			name: 'Dance Class',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="dance">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'fade-class',
			name: 'Fade Class',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="fade">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'bounce-class',
			name: 'Bounce Class',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="bounce">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'keep-color',
			name: 'Keep Color Class',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="keepColor">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});
		this.addCommand({
			id: 'normal-style-class',
			name: 'Normal Style Class',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span class="norSty">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-7));
			}
		});

		this.addCommand({
			id: 'font-size',
			name: 'Font Size',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span style="font-size:16;">'+selection+'</span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-selection.length-10));
			}
		});

		this.addCommand({
			id: 'cube-y',
			name: 'Cube?',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<div style="perspective:800px;perspective-origin:top right;width:30%;aspect-ratio:3/4;filter:drop-shadow(1em 2em 0.7em #111);" title="3D Cube with pure HTML and CSS"><div style="font-size: 4em;width: 2em;margin: 1.5em auto;transform-style: preserve-3d;transform: rotateX(-45deg) rotateY(30deg);"><div style="position: absolute;width: 2em;height: 2em;background: rgba(100,100,100,0.5);border: 1px solid red;text-align: center;line-height: 2em; transform: translateZ(1em);">1</div><div style="position: absolute;width: 2em;height: 2em;background: rgba(100,100,100,0.5);border: 1px solid red;text-align: center;line-height: 2em; transform: rotateY(-180deg) translateZ(1em);">6</div><div style="position: absolute;width: 2em;height: 2em;background: rgba(100,100,100,0.5);border: 1px solid red;text-align: center;line-height: 2em; transform: rotateY(90deg) translateZ(1em);">4</div><div style="position: absolute;width: 2em;height: 2em;background: rgba(100,100,100,0.5);border: 1px solid red;text-align: center;line-height: 2em; transform: rotateY(-90deg) translateZ(1em);">3</div><div style="position: absolute;width: 2em;height: 2em;background: rgba(100,100,100,0.5);border: 1px solid red;text-align: center;line-height: 2em; transform: rotateX(90deg) translateZ(1em);">5</div><div style="position: absolute;width: 2em;height: 2em;background: rgba(100,100,100,0.5);border: 1px solid red;text-align: center;line-height: 2em; transform: rotateX(-90deg) translateZ(1em);">2</div></div></div>');
			}
		});

		this.addCommand({
			id: 'window-width-checker',
			name: 'Check Window Width (base font size = 16)',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<div style="border:2px solid grey;border-radius:16px;width:75%;"><b>If same, then <u>window-size=<span style="color:#00FF00;">correct</span></u>:<hr></b><span style="background:#FF0000;color:#20FF0F;font-size:16px;"><code>■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ </code><b style="color:#00FFFF;">|</b></span><br><span style="background:#FF0000;color:#20FF0F;font-size:2.05vw;"><code>■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ </code><b style="color:#00FFFF;">|</b></span></div>');
			}
		});

		this.addCommand({
			id: 'cancel-text',
			name: 'Cancel Text',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection('<span style="border:2px solid red;border-radius:50%; background: linear-gradient(to left top, transparent 47.75%, red 49%, red 51%, transparent 52.25%);padding:3px;z-index:200;"><span style="z-index:100;display:inline-block;">'+selection+'</span></span>');
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-14));
			}
		});


		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class ColorPickerModal extends Modal {
	constructor(app: App) {
		super(app);
		this.setTitle('Pick a color')
		let colorV = '#000000';
		new Setting(this.contentEl)
			.setName('Color')
			.addColorPicker((colorP) =>
				colorP.onChange((value) => {
					colorV = value;
				}));

		new Setting(this.contentEl)
			.addButton((btn) =>
				btn
					.setButtonText('Submit')
					.setCta()
					.onClick(() => {
						this.close();
						onSubmit(colorV);
					}));
		new Setting(this.contentEl).setName('');
		new Setting(this.contentEl).setName('R - Red - #FF5252');
		new Setting(this.contentEl).setName('O - Orange - #FFA852');
		new Setting(this.contentEl).setName('Y - Yellow - #FFFF52');
		new Setting(this.contentEl).setName('L - Lime - #A8FF52');
		new Setting(this.contentEl).setName('G - Green - #52FF52');
		new Setting(this.contentEl).setName('U - Aquamarine - #52FFA8');
		new Setting(this.contentEl).setName('A - Electric - #52FFFF');
		new Setting(this.contentEl).setName('Z - Azure - #52A8FF');
		new Setting(this.contentEl).setName('B - Blue - #5252FF');
		new Setting(this.contentEl).setName('V - Violet - #A852FF');
		new Setting(this.contentEl).setName('F - Fuchsia - #FF52FF');
		new Setting(this.contentEl).setName('M - Magenta - #FF52A8');
		new Setting(this.contentEl).setName('W - White - #FFFFFF');
		new Setting(this.contentEl).setName('W+K - Gray - #7F7F7F');
		new Setting(this.contentEl).setName('K - Black - #000000');
	}

	// onOpen() {
	// 	const {contentEl} = this;
	// 	contentEl.setText('Woah!');
	// }

	// onClose() {
	// 	const {contentEl} = this;
	// 	contentEl.empty();
	// }
}

class SampleSettingTab extends PluginSettingTab {
	plugin: htmlMdScPlugin;

	constructor(app: App, plugin: htmlMdScPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
