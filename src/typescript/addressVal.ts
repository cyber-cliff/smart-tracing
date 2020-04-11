const addressVal = (() => {
  let top: object | undefined;
  return {
    init: (root:string, div_selector:string) => {
      const placesAutocomplete = places({
        appId: 'plJXSL15FVYB',
        apiKey: '32ee25315f3be220818ca4db278bb2df',
        container: document.querySelector(div_selector),
        templates: {
          value: function(suggestion) {
            return (suggestion.name+', '|| '')+(suggestion.city+', '|| '')+(suggestion.administrative+' '|| '')+(suggestion.postcode|| '');
          }
        }
      }).configure({
        countries: ['us']
      });
      placesAutocomplete.on('suggestions', function(e) {
        top = e.suggestions[0]
      });
      placesAutocomplete.on('change', function(e){
        top = e.suggestion;
        console.log(e.suggestion);
        //@ts-ignore
        var premise, thoroughfare;
        if(e.suggestion.name){
          premise = addressVal.splitAddress(e.suggestion.name).number
          thoroughfare = addressVal.splitAddress(e.suggestion.name).street
        } else {
          premise = undefined
          thoroughfare = undefined
        }
        //@ts-ignore
        document.querySelector(root+'-premise').value =      premise || '';
        //@ts-ignore
        document.querySelector(root+'-thoroughfare').value = thoroughfare || '';
        //@ts-ignore
        document.querySelector(root+'-locality').value =     e.suggestion.city || '';
        //@ts-ignore
        document.querySelector(root+'-administrativeArea').value = e.suggestion.administrative || '';
        //@ts-ignore
        document.querySelector(root+'-postalCode').value =   e.suggestion.postcode || '';
        //@ts-ignore
        document.querySelector(root+'-country').value =      e.suggestion.country || '';
      })
      $(div_selector).blur(function() {
        console.log(top);
        if(top){
          console.log(document.querySelector(div_selector));
          var formatted = String((top.name+', '|| '')+(top.city+', '|| '')+(top.administrative+' '|| '')+(top.postcode|| ''))
          $(div_selector).val(formatted);
        }
      });
    },
    isNumber: (n: string) =>{
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    isFractionalChar: (n: string)=>{
      var c = n.charCodeAt();
      return (c >= 188 && c <= 190) || (c >= 8531 && c <= 8542);
    },
    indexFractionalChar: (m: string)=>{
      var a = m.split(''), i;
      for (i in a) {
        if (addressVal.isFractionalChar(a[i]))
          return i;
      }
      return false;  
    },
    splitAddress: (x: string)=>{
      var a = x.trim().split(' '), number, street;
      if (a.length <= 1)
        return {number: '', space: '', street: a.join('')};
      if (addressVal.isNumber(a[0].substr(0, 1)) || addressVal.isFractionalChar(a[0].substr(0, 1))) {
        number = a.shift();
      } else {
        // If there isn't a leading number, just return the trimmed input as the street
        return {number: '', space: '', street: x.trim()}
      }
      if (/[0-9]\/[0-9]/.exec(a[0]) || addressVal.indexFractionalChar(a[0]) !== false)
        number += ' ' + a.shift();
      return {number: number, space: ' ', street: a.join(' ')};
    }
  }
})();