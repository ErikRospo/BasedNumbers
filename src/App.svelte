<script lang="ts">
  import {Bases} from './lib/Bases';
  import {Complex} from './lib/Complex'
  let baseInput = '0'
  let valueInput='0'
  let numeralValue='0';
  let expandedString='0';
  let compactString='0';
  function calculate(){
    console.log(baseInput)
    let baseNum=Complex.fromString(baseInput);
    let valueNum=Number.parseFloat(valueInput);
    let baseVal=new Bases(baseNum);
    baseVal.setPVFromNum(valueNum);
    return {value:baseVal.value,expandedString:baseVal.expandedString,string:baseVal.string}    
  }
  function calculateAndSet(){
    let c=calculate();
    numeralValue=c.value.toString();
    expandedString=c.expandedString;
    compactString=c.string;
  }
  
  
</script>


<div class="container">
  <h1 class="header">Based Numbers</h1>
  <input
    class="input"
    type="text"
    placeholder="Enter a base number"
    bind:value={baseInput}
  />
  <input
    class="input"
    type="text"
    placeholder="Enter a value to convert"
    bind:value={valueInput}
  />
  <button on:click={calculateAndSet}>Calculate</button>
  <hr>
  <p>Numeral Value: {numeralValue}</p><br>
  <p>Expanded/full Value: {expandedString}</p><br>
  <p>Compact Value: {compactString}</p><br>
  
</div>

<style>
  .container {
    margin: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
  }

  .header {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .input {
    margin-bottom: 0.5rem;
  }
</style>