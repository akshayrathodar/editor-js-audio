
export default class AudioUploadAr {

   constructor({data, api, config}){
   this.api = api;
   this.config = config || {};
   this.data = {
     audiolink: data.audiolink || '',
   };
   this.ID = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
    // ... this.data
    // ... this.wrapper
    // ... this.settings
  }
  static get toolbox() {
    return {
      title: 'Audio',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"><path d="M13 0h-2v15.676c-3.379-.667-7 1.915-7 4.731 0 2.367 1.881 3.593 3.919 3.593 2.423 0 5.077-1.728 5.081-5.24v-12.76c3.009 2.223 5.623 3.243 5.059 7 1.431-1.727 1.941-2.817 1.941-4.051 0-4.446-7-5.915-7-8.949z"/></svg>'
    };
  }
  

  static get ID() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  
  
  



  render(){
    // var wrap = this._make('div','cdx-button',{});
    // var dlink = this._make('a',null,{"id":"elink","target":"_blank"});
    var ip = this._make('div','cdx-button',{'type':'file','id':'efile'});
    var mainwrapperdiv = this._make('div','modal-dialog',{'role':'document',"id":"mainmodel","data-id":"rootmodel"});
    // mainwrapperdiv : its first div there start html
     //secondcenter   : just loading center tag
    // h1loading      : h1 tag loading  [ class = hide , id : edload]

    if(this.data.audiolink != '' && this.data.audiolink != undefined) {
       
        var s = document.createElement("audio");
        s.setAttribute('controls','controls');
        s.src = this.data.audiolink;
        s.style.width = '100%';
        s.id  = 'audioplayer';
        s.load();
        s.addEventListener("canplay", function() {
           ip.appendChild(s);
           mainwrapperdiv.appendChild(ip);  

        });

    } else {

     
     var secondcenter   = this._make('center','',null);
     var h1loading      = this._make('h1','hide',{"id":"edload"});
    
     secondcenter.appendChild(h1loading); //green
    
     var modalcontent   = this._make('div','modal-content',null);
     var modalbody      = this._make('div','modal-body',null);
     var gentab         = this._make('div','gen-tabs',null);

     var ulnavtab       = this._make('ul',['nav','nav-tabs'],{'role':'tablist'});

     var liuploadtab    = this._make('li','active',{'role':'presentation'});
     var uploadinga     = this._make('a','',{"href":"#uploadimg","aria-controls":"uploadimg","role":"tab","data-toggle":"tab","aria-expanded":"true"});
     uploadinga.innerHTML = 'Upload an Audio';

     liuploadtab.appendChild(uploadinga); // green

     var lilinktab      = this._make('li','',{'role':'presentation'});
     var linkattacha    = this._make('a','',{"href":"#imglinkeditor","aria-controls":"imglinkeditor","role":"tab","data-toggle":"tab","aria-expanded":"false"});
     linkattacha.innerHTML = 'Audio Link';

     lilinktab.appendChild(linkattacha); // green


    // //#####  // green
     ulnavtab.appendChild(liuploadtab);
     ulnavtab.appendChild(lilinktab);
    // //#####

    var divtabcontentcf = this._make('div',['tab-content','cf'],null);
    var divtabpanel     = this._make('div',['tab-pane','active'],{"role":"tabpanel","id":"uploadimg"});
    var divchoosupload  = this._make('div',['choose-upload','text-center'],null);
    var divmainbtnsmbtn = this._make('div',['main-btn','sm-btn'],null);

    var inputeditorfileupload = this._make('input','',{"type":"file","name":"editorfileupload","id":"editorfileupload"});
    divmainbtnsmbtn.innerHTML = "Upload Audio";

    divmainbtnsmbtn.appendChild(inputeditorfileupload); // green

    var smalleditorerrormsg = this._make('small','',{"id":"editorerrormsg"});

    //######
    divchoosupload.appendChild(divmainbtnsmbtn);
    divchoosupload.appendChild(smalleditorerrormsg);
    //###### // green

    // #####################
    divtabpanel.appendChild(divchoosupload);
    // #####################

    var divtabpanelimglinkeditor = this._make('div','tab-pane',{"role":"tabpanel","id":"imglinkeditor"});
    var divchoosupload2 = this._make('div',["choose-upload","text-center"],null);
    
    var divformgroupcf = this._make('div',['form-group','cf'],null);
    var inputeditorlinkpast = this._make('input','is-form-control',{"type":"text","name":"editorlinkpast","id":"editorlinkpast","placeholder":"Paste an Image Link.."});
    var buttoneditorlinkbtn = this._make('button',['main-btn','sm-btn'],{"type":"submit","id":"editorlinkbtn"});
    var smalllinkerrormsg   = this._make('small',null,{'style':'color:red'});
    buttoneditorlinkbtn.innerHTML = "Submit an Link";

    // ##########

    divformgroupcf.appendChild(inputeditorlinkpast);
    divformgroupcf.appendChild(buttoneditorlinkbtn);
    divformgroupcf.appendChild(smalllinkerrormsg);
    // ##########

    // #############
    divchoosupload2.appendChild(divformgroupcf);

    //###################
    divtabpanelimglinkeditor.appendChild(divchoosupload2);
    //###################

    // #########################
    divtabcontentcf.appendChild(divtabpanel);
    divtabcontentcf.appendChild(divtabpanelimglinkeditor);
    // #########################   divtabcontentcf complete


    // // ############################
     gentab.appendChild(ulnavtab);
     gentab.appendChild(divtabcontentcf);
    // // ############################

    // // #############################
    modalbody.appendChild(gentab);
    // // #############################

    // // ###############################
     modalcontent.appendChild(modalbody);
    // // ###############################

    // // ####################################
     mainwrapperdiv.appendChild(secondcenter);
     mainwrapperdiv.appendChild(modalcontent);
    

     // #########################[ EVENT SECTION ]########################

     // file upload change event
     inputeditorfileupload.addEventListener('change',(event)=>{
       
        let file = event.target.files[0];
        let formdata = new FormData();

        const  fileType = file['type'];
        const validImageTypes = ['audio/mpeg', 'audio/x-wav', 'video/ogg'];
        if (validImageTypes.includes(fileType)) {
            //remove error msg
              smalleditorerrormsg.innerHTML = "";
            // end remove error msg

              formdata.append("file", file);
              formdata.append("psize",$('#psize').val());
              formdata.append('user',$('#user_identification').val());
              formdata.append('wp_identification',$('#wp_identification').val());
              formdata.append('pg_identification',$('#pg_identification').val());

              $(event.target).parents('.modal-content').addClass('hide');
              
              $.ajax({
                url: API_END_POINT + "editor.audio", 
                type: "POST",
                data: formdata,
                processData: false,
                contentType: false,
                success: function(result)
                {
                  if(result.file == "largefile") { 
                    $('#editorerrormsg').html('Please Upload Small Image Or Upgrade Your Plan');
                  } else {

                  var s = document.createElement("audio");
                  s.setAttribute('controls','controls');
                  s.src = result.body.file.url;
                  s.style.width = '100%';
                  s.id  = '_' + Math.random().toString(36).substr(2, 9);
                  s.load();
                  s.addEventListener("canplay", function() {
                    smalleditorerrormsg.innerHTML = '';
                    
                    $(event.target).parents('.modal-dialog').html(s);
                    
      
                  });
                  s.addEventListener("error", function() {
                     smalleditorerrormsg.style.color = "RED";
                     smalleditorerrormsg.innerHTML = "Uploaded File Format is Not Supported";
                  });
           
                  }
                  
                }
              });

        } else {
          smalleditorerrormsg.style.color = "RED";
          smalleditorerrormsg.innerHTML = "Uploaded File Format is Not Supported";
        }
        this.api.saver.save();
     });
     
      buttoneditorlinkbtn.addEventListener("click",(event)=>{
          var link = inputeditorlinkpast.value;

            var s = document.createElement("audio");
            s.setAttribute('controls','controls');
            s.src = link;
            s.style.width = '100%';
            s.id  = '_' + Math.random().toString(36).substr(2, 9);
            s.load();
            s.addEventListener("canplay", function() {
              smalllinkerrormsg.innerHTML = '';
              
              $(event.target).parents('.modal-dialog').html(s);
            
            });
            s.addEventListener("error", function() {
              console.log('im cld');
               smalllinkerrormsg.innerHTML = "Given Link is not Audio or link is Broken ";
            });

      });

    }


        

    

      
   
    
    return mainwrapperdiv;
  }

  save(blockContent){
    return {"audiolink":$(blockContent).find('audio').attr('src')};
  }

  // renderSettings(){
  //   const settings = [
  //     {
  //       name: 'Reset',
  //       icon: `<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M2.458 9.012c-.297.947-.458 1.955-.458 3 0 5.52 4.481 10 10 10 5.52 0 10-4.48 10-10 0-5.519-4.48-10-10-10-2.121 0-4.083.668-5.703 1.796l1.703 2.204h-6.58l1.935-6.012 1.718 2.223c1.958-1.389 4.346-2.211 6.927-2.211 6.623 0 12 5.377 12 12s-5.377 11.988-12 11.988-12-5.365-12-11.988c0-1.036.132-2.041.379-3h2.079zm10.35-3.012c.292.821.375 1.346 1.01 1.609.637.264 1.073-.052 1.854-.423l1.142 1.142c-.373.787-.687 1.218-.423 1.854.262.634.784.716 1.609 1.009v1.617c-.816.29-1.347.375-1.61 1.01-.264.636.052 1.071.424 1.853l-1.142 1.142c-.79-.375-1.219-.687-1.85-.424-.639.265-.723.793-1.014 1.611h-1.616c-.292-.821-.375-1.347-1.01-1.61-.637-.264-1.072.052-1.854.423l-1.142-1.142c.366-.771.689-1.212.423-1.854-.263-.635-.793-.719-1.609-1.009v-1.617c.817-.29 1.346-.373 1.609-1.009.264-.637-.051-1.07-.423-1.854l1.142-1.142c.788.374 1.218.687 1.854.423.635-.263.719-.792 1.01-1.609h1.616zm-.808 8c-1.105 0-2-.896-2-2 0-1.105.895-2.001 2-2.001 1.104 0 2 .896 2 2.001 0 1.104-.896 2-2 2z"/></svg>`
  //     },

  //   ];
  //   const wrapper = document.createElement('div');

  //   settings.forEach( tune => {
  //     let button = document.createElement('div');

  //     button.classList.add('cdx-settings-button');
  //     button.innerHTML = tune.icon;
  //     wrapper.appendChild(button);

  //     button.addEventListener('click', () => {
        
  //       if(tune.name == 'Reset') {
  //         $('#efile').val('');
  //         $('#elink').addClass('hide');
  //       }
  //     });

  //   });

  //   return wrapper;
  // }


 // this will create a tag with attr
 
  _make(tagName, classNames = null, attributes = {}) {
    const el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }
  
    for (const attrName in attributes) {
      el.setAttribute(attrName,attributes[attrName]);
//      el[attrName] = attributes[attrName];
    }

    return el;
  }
}
