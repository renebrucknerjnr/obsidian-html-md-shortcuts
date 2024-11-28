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
				editor.replaceSelection('<span class="glow">Text</span>\n<span class="dance">Text</span>\n<span class="fade">Text</span>\n<span class="lined">Text</span>\n<span class="bounce">Text</span>\n<span class="highlight R">Text</span>  <span class="cR">Text</span> <span class="boxR">Text</span>\n<span class="highlight O">Text</span>  <span class="cO">Text</span> <span class="boxO">Text</span>\n<span class="highlight Y">Text</span>  <span class="cY">Text</span> <span class="boxY">Text</span>\n<span class="highlight L">Text</span>  <span class="cL">Text</span> <span class="boxL">Text</span>\n<span class="highlight G">Text</span>  <span class="cG">Text</span> <span class="boxG">Text</span>\n<span class="highlight U">Text</span>  <span class="cU">Text</span> <span class="boxU">Text</span>\n<span class="highlight A">Text</span>  <span class="cA">Text</span> <span class="boxA">Text</span>\n<span class="highlight Z">Text</span>  <span class="cZ">Text</span> <span class="boxZ">Text</span>\n<span class="highlight B">Text</span>  <span class="cB">Text</span> <span class="boxB">Text</span>\n<span class="highlight V">Text</span>  <span class="cV">Text</span> <span class="boxV">Text</span>\n<span class="highlight F">Text</span>  <span class="cF">Text</span> <span class="boxF">Text</span>\n<span class="highlight M">Text</span>  <span class="cM">Text</span> <span class="boxM">Text</span>\n<span class="highlight W">Text</span>  <span class="cW">Text</span> <span class="boxW">Text</span>\n<span class="highlight W K">Text</span>  <span class="cW cK">Text</span> <span class="boxWK">Text</span>\n<span class="highlight K">Text</span>  <span class="cK">Text</span> <span class="boxK">Text</span>\n<span class="highlight X">Text</span>  <span class="cX">Text</span> <span class="boxX">Text</span>\n<span class="popUp"><span class="popTxt">A greeting</span>Hello</span>\n<span class="popUp highlight R"><span class="popTxt"><span class="lined"><span class=\'cR\'>R</span><span class=\'cO\'>O</span><span class=\'cY\'>Y</span><span class=\'cL\'>L</span><span class=\'cG\'>G</span><span class=\'cU\'>U</span><span class=\'cA\'>A</span><span class=\'cZ\'>Z</span><span class=\'cB\'>B</span><span class=\'cV\'>V</span><span class=\'cF\'>F</span><span class=\'cM\'>M</span><span class=\'cW\'>W</span><span class=\'cK\'>K</span> <span class=\'cW cK\'>WK</span></span></span>A random mix, maybe. Not really? I don\'t know!</span>\n<span class="glow keepColor"> keepColor</span> <span class="dance keepColor"> keepColor</span> <span class="fade keepColor"> keepColor</span> <span class="lined keepColor">keepColor</span> <span class="bounce keepColor"> keepColor</span> <span class="highlight R keepColor">keepColor</span>  <span class="cR keepColor">keepColor</span>\n<span class="boxL">Hello text</span> <span class="boxZ highlight V">Hello text</span> <span class="boxL cR">Hello text</span> <span class="boxR cG highlight B">Hello text</span>\n- <span id="help"></span><hr id="x">\n---\n');
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
			id: 'assistance',
			name: 'Help',
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
				editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor())-selection.length-16));
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
