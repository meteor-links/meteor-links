<script>
  import { onMount } from "svelte";
  import i18n from 'meteor/universe:i18n';
  import { CurrentLocale, _} from "/lib/configs/client/i18n";

  let Translate;
  let _currentLocale = null;
  let __ = function(...data){console.log("denemelerden seçmeler"); return _(...data);}
  $m: {
      _currentLocale = CurrentLocale.get();
      // __ = function(...data){return _(...data);};
      Translate = i18n.createReactiveTranslator();
      setTimeout(function(){
          __ = function(...data){return _(...data);}
      },500)
  }


  // onMount(() => {
  //     document.querySelectorAll('.brd-language').forEach(function(item){
  //     item.addEventListener('click', function(event){
  //       console.log("deneme");
  //       event.preventDefault();
        
  //       const locale = event.target.dataset.code;
  //       console.log(locale);
  //       CurrentLocale.set(locale);
  //     });
  //   });
  // });
  
</script>

<div>
<div class="nav-item my-auto justify-content-center dropdown d-flex componentI18nSelector p-3 border-end ">
  <a class="btn py-0 shadow-none d-flex align-items-center text-decoration-none dropdown-toggle" href="#" id="navbari18Dropdown" role="button" data-bs-toggle="dropdown"
    data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
    
    <span class="fs-5 fw-brd-bold text-brd-secondary-50 align-top">{_currentLocale}</span>

  </a>
  <div class="dropdown-menu shadow border-0 p-0" aria-labelledby="navbari18Dropdown">
    <div class="d-flex bg-white rounded-5 p-1">
      <div class="flex-grow-1 p-3">
        <span class="text-primary small fw-brd-bold">{__('globals', 'ok')}</span>
        <span class="text-primary small fw-brd-bold">{__('globals', 'yes')}</span>
        
        
        {#key _currentLocale}
          <div class="brd-min-width-125">
            <button on:click={()=>{CurrentLocale.set('en-US');}} class="dropdown-item brd-language border-bottom px-0 py-2 {(_currentLocale == 'en-US') ? 'opacity-100' : 'opacity-50'}"
              data-code="en-US"><span data-code="en-US" class="flag-icon rounded flag-icon-gb me-3"></span>EN</button>
            <button on:click={()=>{CurrentLocale.set('tr-TR');}} class="dropdown-item brd-language border-bottom px-0 py-2 {(_currentLocale == 'tr-TR') ? 'opacity-100' : 'opacity-50'}"
              data-code="tr-TR"><span data-code="tr-TR" class="flag-icon rounded flag-icon-tr me-3"></span>TR</button>
          </div>
        {/key}
      </div>
    </div>
  </div>
</div>
</div>