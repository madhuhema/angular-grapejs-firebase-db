import grapejs from 'grapesjs';
import 'grapesjs-blocks-basic';

export interface GrapeInterface {
    getEditor(): void
}
export class Grape implements GrapeInterface {

    private _editor: any;
    private _grape: any;

    getEditor() {
        return this._editor;
    }

    getGrape() {
        return this._grape;
    }

    constructor(option) {
        this._grape = grapejs;
        this._editor = this.initializeEditor(option);
    }


    private initializeEditor(option): any {
        return grapejs.init(option);
    }

}