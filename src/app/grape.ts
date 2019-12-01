import grapejs from 'grapesjs';
import 'grapesjs-blocks-basic';

export interface GrapeInterface {
    getEditor(): void
}
export class Grape implements GrapeInterface {

    private _editor: any;
    private _grape: any;

    options = {
        student: {
            container: '#gjs',
            plugins: ['gjs-blocks-basic'],
            // pluginsOpts: {
            //   'gjs-blocks-basic': {

            //   }
            // }
        },
        teacher: {
            container: '#gjs',
            plugins: [],
            // pluginsOpts: {
            //   'gjs-blocks-basic': {

            //   }
            // }
        }
    }

    getEditor() {
        return this._editor;
    }

    getGrape() {
        return this._grape;
    }

    constructor(option) {
        this._grape = grapejs;
        this._editor = this.initializeEditor(option);
        if (option == "teacher") {
            this.removeUnneccessaryPanels();
        }
    }

    removeUnneccessaryPanels() {
        const panels = this._editor.Panels;
        const p = panels.getPanels().models;
        const pl = panels.getPanelsEl();
        p.forEach(model => {
            if (model.id === "views" || model.id === "views-container") {
                console.log(model);
                panels.removePanel(model);
            }
        })
    }

    private initializeEditor(option): any {
        return grapejs.init(this.options[option]);
    }

}