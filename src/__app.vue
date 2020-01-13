<template>
  <div>
    <div>
      {{description}}
    </div>
    <div>
      <i class="fab fa-500px"></i>
    </div>
    <div>
      {{list}}
    </div>
    <draggable v-model="list" group="people" @start="drag=true" @end="drag=false">
      <div v-for="element in list" :key="element.id" class="item">{{element.name}}</div>
    </draggable>
    <button class="btn btn-secondary" @click="add">Add</button>
  </div>
</template>
<script>
import Vue from 'Vue'
import draggable from 'vuedraggable'
let id = 1;
export default Vue.extend({
  components: {
    draggable
  },
  data() {
    return {
      description: "Parcel - Vue Project",
      list: [
        {
          "name": "Edgard",
          "id": 6
        },
        {
          "name": "Juan 7",
          "id": 7
        },
        {
          "name": "Juan 8",
          "id": 8
        },
        {
          "name": "Juan 9",
          "id": 9
        }
      ]
    }
  },
  created () {
    // // Taking care of the browser-specific prefixes.
    // window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem; 
    // window.directoryEntry = window.directoryEntry || window.webkitDirectoryEntry;

    // // function onFs(fs){
    // //   fs.root.getDirectory('Views', {create:true}, function(directoryEntry){
    // //     console.log(directoryEntry)
    // //     //directoryEntry.isFile === false
    // //     //directoryEntry.isDirectory === true
    // //     //directoryEntry.name === 'Documents'
    // //     //directoryEntry.fullPath === '/Documents'
        
    // //     }, onError);

    // //     fs.root.readEntries('Views', {create:true}, function(directoryEntry){
    // //     console.log(directoryEntry)
    // //     //directoryEntry.isFile === false
    // //     //directoryEntry.isDirectory === true
    // //     //directoryEntry.name === 'Documents'
    // //     //directoryEntry.fullPath === '/Documents'
        
    // //     }, onError);

    // //   }

    // function onFs(fs){
    //   fs.root.getDirectory('./Views', {}, function(dirEntry){
    //   var dirReader = dirEntry.createReader();
    //   console.log(dirReader)
    //   dirReader.readEntries(function(entries) {
    //     for(var i = 0; i < entries.length; i++) {
    //       var entry = entries[i];
    //       if (entry.isDirectory){
    //         console.log('Directory: ' + entry.fullPath);
    //       }
    //       else if (entry.isFile){
    //         console.log('File: ' + entry.fullPath);
    //       }
    //     }

    //   }, onError);
    // }, onError);
    // }

    // // function readDirectory(directory) {
    // //   let dirReader = directory.createReader();
    // //   let entries = [];

    // //   let getEntries = function() {
    // //     dirReader.readEntries(function(results) {
    // //       if (results.length) {
    // //         entries = entries.concat(toArray(results));
    // //         getEntries();
    // //       }
    // //     }, function(error) {
    // //       /* handle error -- error is a FileError object */
    // //     });
    // //   };

    // //   getEntries();
    // //   return entries;
    // // }

    // // readDirectory('./Views')
    
    // function onError (error) {
    //   console.log(error)
    // }

    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

    // Opening a file system with temporary storage
    window.requestFileSystem(window.TEMPORARY, 5*1024*1024 /*5MB*/, onInitFs, errorHandler);
    
    function onInitFs(fs) {
      console.log(fs)
      console.log('Opened file system: ' + fs.name);
      fs.root.getFile('./Views/log.txt', {create: true, exclusive: true}, function(fileEntry) {

        // fileEntry.isFile === true
        // fileEntry.name == 'log.txt'
        // fileEntry.fullPath == '/log.txt'

      }, errorHandler);

        fs.root.getFile('./Views/log.txt', {}, function(fileEntry) {

        // Get a File object representing the file,
        // then use FileReader to read its contents.
        fileEntry.file(function(file) {
          var reader = new FileReader();

          reader.onloadend = function(e) {
            var txtArea = document.createElement('textarea');
            txtArea.value = this.result;
            document.body.appendChild(txtArea);
          };

          reader.readAsText(file);
        }, errorHandler);
      }, errorHandler);

    }

    function errorHandler (e) {
      var msg = '';

      // switch (e.code) {
        // case FileError.QUOTA_EXCEEDED_ERR:
        //   msg = 'QUOTA_EXCEEDED_ERR';
        //   break;
        // case FileError.NOT_FOUND_ERR:
        //   msg = 'NOT_FOUND_ERR';
        //   break;
        // case FileError.SECURITY_ERR:
        //   msg = 'SECURITY_ERR';
        //   break;
        // case FileError.INVALID_MODIFICATION_ERR:
        //   msg = 'INVALID_MODIFICATION_ERR';
        //   break;
        // case FileError.INVALID_STATE_ERR:
        //   msg = 'INVALID_STATE_ERR';
        //   break;
        // default:
        //   msg = 'Unknown Error';
        //   break;
      // };

      console.log('Error: ' + msg);
    }
  },
  methods: {
    onError (error) {
      console.log(error)
    },
    add: function() {
      this.list.push({ name: "test " + id, id: id++ });
    }
  }
})

</script>
<style lang="scss" scoped>
.container {
  color: green;
}
.item {
  position: relative;
  display: block;
  padding: .75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.125);
}
</style>