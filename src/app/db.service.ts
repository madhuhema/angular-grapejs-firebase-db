import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subject } from 'rxjs';
import { Grape } from './grape';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  $templateObjRef = this.db.object('/template');
  $template = new Subject();
  private _grape;
  private _editor;
  constructor(public db: AngularFireDatabase) {

  }

  init(option) {
    this._grape = new Grape(option);
    this._editor = this._grape.getEditor();
    // this.createOnEvents('student');
    this.createStorage();
    this._editor.load();
  }

  createStorage() {
    const storage = this.$templateObjRef;

    this._editor.StorageManager.add('local', {
      /**
       * Load the data
       * @param  {Array} keys Array containing values to load, eg, ['gjs-components', 'gjs-style', ...]
       * @param  {Function} clb Callback function to call when the load is ended
       * @param  {Function} clbErr Callback function to call in case of errors
       */
      load(keys, clb, clbErr) {
        const result = {};
        console.log('loading...')
        storage.query.once('value').then(data => {
          console.log(data.val());
          clb(data.val());
        }).catch((error) => {
          clbErr(error);
        })

        // keys.forEach(key => {
        //   const value = storage[key];
        //   if (value) {
        //     result[key] = value;
        //   }

        // });
        // Might be called inside some async method

      },

      /**
       * Store the data
       * @param  {Object} data Data object to store
       * @param  {Function} clb Callback function to call when the load is ended
       * @param  {Function} clbErr Callback function to call in case of errors
       */
      store(data, clb, clbErr) {
        storage.update(data).then(data => {
          console.log('stored', data);
          clb();
        }).catch(err => {
          console.log('err storing', err);
          clbErr(err);
        })
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
