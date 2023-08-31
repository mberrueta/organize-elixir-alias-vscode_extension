// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "organize-elixir-alias" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('organize-elixir-alias.helloWorld', async () => {


    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    const text = editor.document.getText();
    const aliasPattern = /(alias\s+[\w\.{} ,:]+)/g;
    const messageTimeout = 3000; // Time in milliseconds


    const aliases = text.match(aliasPattern);
    if (aliases) {

      vscode.window.setStatusBarMessage('Organizing Elixir Aliases.');
      setTimeout(() => { vscode.window.setStatusBarMessage(''); }, messageTimeout);



        const sortedAliases = aliases.sort();
        const positionAt = text.indexOf('alias');
        const removed = text.replace(aliasPattern, "");
        const sortedText = sortedAliases.join("\n");
        const result = removed.slice(0, positionAt) + sortedText + removed.slice(positionAt);

        editor.edit(editBuilder => {
          editBuilder.replace(
            new vscode.Range(
              editor.document.positionAt(0), editor.document.positionAt(text.length)), result
            );
        });

        await vscode.commands.executeCommand('editor.action.formatDocument');
    }
    else
    {
      vscode.window.setStatusBarMessage('no alias found.');
      setTimeout(() => { vscode.window.setStatusBarMessage(''); }, messageTimeout);
    }
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
