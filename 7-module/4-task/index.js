import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    const config = {
      steps: steps,
      value: value,
    }

    this.slider = this._createSlider(config.steps);
    this._addСhangeSliderValue(this.slider, config);
  }

  get elem() {
    return this.slider;
  }

  _createSlider(amountSteps) {
    const slider = createElement(`
      <!--Корневой элемент слайдера-->
      <div class="slider">

        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>

        <!--Полоска слайдера-->
        <div class="slider__progress"></div>

        <!-- Шаги слайдера (вертикальные чёрточки) -->
        <div class="slider__steps"></div>
      </div>
    `);

    const thumb = slider.querySelector('.slider__thumb');
    const progress = slider.querySelector('.slider__progress');
    const containerSteps = slider.querySelector('.slider__steps');

    thumb.style.left = '0%';
    progress.style.width = '0%';

    addSteps(containerSteps, amountSteps);

    return slider;

    function addSteps(containerSteps, amountSteps) {
      while(amountSteps > 0) {
        const step = createElement('<span></span>');
        containerSteps.append(step);
        amountSteps--;
      }
      
      containerSteps.firstElementChild.classList.add('slider__step-active');
    }
  }

  _addСhangeSliderValue(slider, config) {
    const thumb = slider.querySelector('.slider__thumb');

    slider.addEventListener('click', event => {
      config.value = defineValue(event.clientX);

      slider.querySelector('.slider__value').innerHTML = config.value;
      fixedProgressBar();
      changeSliderSteps();
      addEventSliderChange();
    });

    thumb.addEventListener('pointerdown', () => {
      const thumbMove = event => {
        config.value = defineValue(event.clientX);

        slider.querySelector('.slider__value').innerHTML = config.value;
        changeSliderSteps();
        changeProgressBar(event);
      }

      removeDefaultDnD(thumb);
      slider.classList.add('slider_dragging');

      document.addEventListener('pointermove', thumbMove);

      document.onpointerup = function() {
        slider.classList.remove('slider_dragging');
        
        fixedProgressBar();
        addEventSliderChange();

        document.removeEventListener('pointermove', thumbMove);
        document.onpointerup = null;
      }
    });

    function removeDefaultDnD(thumb) {
      thumb.ondragstart = function() {
        return false;
      };
    }

    function defineValue(clickX) {
      const sliderWidth = slider.clientWidth;
      const sliderLeft = slider.getBoundingClientRect().left;
      const steps = config.steps - 1;
  
      const stepWidth = sliderWidth / steps;

      let value = steps - Math.round((sliderWidth - (clickX - sliderLeft)) / stepWidth);
  
      return (value < 0) ? 0
           : (value > steps) ? steps
           : value;
    }

    function changeProgressBar(event) {
      const progress = slider.querySelector('.slider__progress');

      let shiftX = event.clientX - slider.getBoundingClientRect().left;

      let position = (shiftX < 0) ? 0
                   : (shiftX > slider.clientWidth) ? slider.clientWidth
                   : shiftX;

      thumb.style.left = `${position / slider.clientWidth * 100}%`;
      progress.style.width = `${position / slider.clientWidth * 100}%`;
    }

    function fixedProgressBar() {
      const thumb = slider.querySelector('.slider__thumb');
      const progress = slider.querySelector('.slider__progress');

      let leftPercents = definePercents(slider, config);

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

      function definePercents() {
        const sliderWidth = slider.clientWidth;
        const steps = config.steps;
    
        const stepWidth = sliderWidth / (steps - 1);
  
        return (stepWidth / sliderWidth * 100) * config.value;
      }
    }

    function changeSliderSteps() {
      const steps = slider.querySelector('.slider__steps').children;

      for (let step of steps) {
        step.classList.remove('slider__step-active');
      }

      const activeStep = slider.querySelector(`.slider__steps span:nth-child(${config.value + 1})`); 
      activeStep.classList.add('slider__step-active');
    }

    function addEventSliderChange() {
      const sliderChange = new CustomEvent('slider-change', {
        detail: config.value,
        bubbles: true,
      })

      slider.dispatchEvent(sliderChange);
    }
  }
}