
<template>
  <div class="qq">
    <h2 class="qq__title">Транслитерация с {{labelIn + 'ы'}} на {{labelOut + 'y'}}</h2>
    <div class="qq__grid">
      
      <div class="qq__col">
        <label for="income" class="qq__label">Текст на {{labelIn + 'е'}}</label>
        <textarea v-model="income" id="income" class="qq__input"></textarea>
      </div>
      <button
        class="qq__toggle"
        @click="toggleDirection"
        title="Смениить направление"
      >
        <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M30.997 13.41S46 14.59 46 26c0 0-1.911-4.672-9.174-5.557-1.147-.148-2.963-.295-5.83-.295V26L18 17l12.997-9v5.41zM18.003 27.852V22L31 31l-12.997 9v-5.41S3 33.41 3 22c0 0 1.911 4.672 9.174 5.557 1.147.148 2.963.295 5.83.295z"
            fill="#000"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div class="qq__col">
        <span class="qq__label">Результат</span>
        <div class="qq__text" >{{ income | qazaq(fromCyr)  }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Editable from './components/Editable.vue';
import { qazaq } from './lib/qzq_filter_regexp';

export default {
  name: 'App',
  components: {
    Editable
  },
  filters: {
    qazaq,
    saveBreaks(value){
      return value.replace(/\n/g, '<br>\n')
    }
  },
  data() {
    return {
      income:
        'Қазақстан Республикасы — Шығыс Еуропа мен Орталық Азияда орналасқан мемлекет. Бaтысында Еділдің төмeнгі ағысынан, шығысында Алтай тауларына дейін 3000 км-ге, солтүстіктегі Батыс Сібір жазығынан, оңтүстіктегі Қызылқұм шөлі мен Тянь-Шань тау жүйесіне 1 600 км-ге созылып жатыр. Қазақстан Каспий теңізі арқылы Әзірбайжан, Иран елдеріне, Еділ өзені және Еділ-Дон каналы арқылы Азов және Қара теңіздерге шыға алады. Мұхитқа тікелей шыға алмайтын мемлекеттердің ішінде Қазақстан — ең үлкені.',
      output: '',
      fromCyr: true
    };
  },
  computed: {
    labelIn() {
      return this.fromCyr ? 'кириллиц' : 'латиниц';
    },
    labelOut() {
      return this.fromCyr ? 'латиниц' : 'кириллиц';
    }
  },
  watch: {
    fromCyr(prev, next) {
      const temp = qazaq(this.income, next);
      this.$nextTick(function() {
        this.income = temp;
      });
    }
  },
  methods: {
    toggleDirection() {
      this.fromCyr = !this.fromCyr;
    }
  }
};
</script>

<style lang="scss">
:root {
  --border: #ccc;
  --back: #f9f9f8;
  --button-size: 40px;
  --gap: 6px;
}

.qq {
   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 18px;
  line-height: 1.5;
  max-width: 980px;
  margin: 0 auto;

  &__title {
    text-align: center;
  }

  &__grid {
    display: flex;
    margin-left: calc(-1 * var(--gap) / 2);
    margin-right: calc(-1 * var(--gap) / 2);
    position: relative;

    @media screen and (max-width: 767px) {
      flex-wrap: wrap;
    }
  }

  &__col {
    flex: 1;
    padding: 0 calc(var(--gap) / 2);

    @media screen and (max-width: 767px) {
      flex: 1 0 100%;
      margin-bottom: 20px;
    }
  }

  &__toggle {
    all: unset;
    border: 1px solid var(--border);
    background: #fff;
    padding: 10px;
    width: var(--button-size);
    height: var(--button-size);
    font-size: var(--button-size);
    border-radius: var(--button-size);
    display: inline-block;
    vertical-align: middle;
    margin: 10px auto;
    z-index: 2;

    @media screen and (min-width: 768px) {
      position: absolute;
      left: 50%;
      top: 30px;
      transform: translate(-50%, 0);
      margin: 0;
    }
    

    cursor: pointer;

    svg {
      vertical-align: top;
      fill: currentColor;
      height: 1em;
      width: auto;
    }
    
  }

  &__label {
    margin-bottom: 0.5em;
    display: block;
    text-align: center;
  }

  

  &__input, &__text {
    font-size: 1em;
    line-height: inherit;
    display: block;
    padding: 1em 1.2em;
    border: 1px solid var(--border);
    display: block;
    min-height: 180px;
    width: 100%;
    box-sizing: border-box;
    height: calc(100% - 40px);;
    min-height: 180px;
    white-space: pre-line;
  }
  &__input {
    appearance: none;
    -webkit-appearance: none;
    resize: vertical;
    color: inherit;
    padding-right: calc(var(--button-size) / 1.1);
    white-space: pre-wrap;
  }

  &__text {
    background-color: var(--back);
    padding-left: calc(var(--button-size) / 1.1);
  }
}
</style>
