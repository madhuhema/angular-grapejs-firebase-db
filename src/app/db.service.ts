import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Grape } from './grape';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  $templateObjRef = this.db.object('/template');
  private _grape;
  private _editor;
  options = {
    student: {
      container: '#gjs',
      plugins: ['gjs-blocks-basic']
    },
    teacher: {
      container: '#gjs',
      plugins: []
    }
  }


  constructor(public db: AngularFireDatabase) {

  }

  init(option) {
    this._grape = new Grape(this.options[option]);
    this._editor = this._grape.getEditor();    
    if (option === "teacher") {
      this.removeInputPanels();
    } else {
      this.$templateObjRef.remove();
    }
    this.createStorage(option);
    this._editor.load();
  }


  removeInputPanels() {
    const panels = this._editor.Panels;
    const p = panels.getPanels().models;
    p.forEach(model => {
      if (model.id === "views" || model.id === "views-container") {
        console.log(model);
        panels.removePanel(model);
      }
    })
  }

  /**
   * Load the data
   * @param  {Array} keys Array containing values to load, eg, ['gjs-components', 'gjs-style', ...]
   * @param  {Function} clb Callback function to call when the load is ended
   * @param  {Function} clbErr Callback function to call in case of errors
   */
  /**
   * Store the data
   * @param  {Object} data Data object to store
   * @param  {Function} clb Callback function to call when the load is ended
   * @param  {Function} clbErr Callback function to call in case of errors
   */
  createStorage(option) {
    const storage = this.$templateObjRef;

    this._editor.StorageManager.add('local', {

      load(keys, clb, clbErr) {
        if (option !== "teacher") {
          console.log('loading...')
          storage.query.once('value').then(data => clb(data.val())).catch((error) => clbErr(error))
        } else {
          try {
            storage.valueChanges().subscribe(data => clb(data))
          } catch (error) {
            clbErr(error)
          }
        }
      },


      store(data, clb, clbErr) {
        if (option !== "teacher") {
          storage.update(data).then(data => {
            console.log('stored', data);
            clb();
          }).catch(err => {
            console.log('err storing', err);
            clbErr(err);
          })
        } else {
          clb();
        }

      }
    });
  }

  // createOnEvents(option) {
  //   switch (option) {

  //     case 'student': {
  //       this._editor.on('storage:store', (data, arg) => {
  //         console.log('storing...', data);
  //         this.$templateObjRef.update(data)
  //           .then(data => console.log('stored data', data))
  //           .catch(err => { console.log('store err', err) })
  //       });
  //       break;
  //     }

  //     case 'teacher': {
  //       console.log('loading...')
  //       try {
  //         this._editor.on('storage:load', (data, arg) => {
  //           this.$templateObjRef.valueChanges()
  //             .subscribe(data => console.log('loaded', data))
  //         });
  //         break;
  //       } catch (error) {
  //         console.log(error);
  //       }

  //     }
  //   }
  // }


}
