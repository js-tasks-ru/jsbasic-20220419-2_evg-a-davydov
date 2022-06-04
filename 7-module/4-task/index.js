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
    const slider = createSlider();
    const thumb = slider.querySelector('.slider__thumb');
    const progress = slider.querySelector('.slider__progress');
    const steps = slider.querySelector('.slider__steps');

    thumb.style.left = '0%';
    progress.style.width = '0%';

    addSteps(steps, amountSteps);

    return slider;

    function createSlider() {
      return createElement(`
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
    }

    function addSteps(steps, amountSteps) {
      while(amountSteps > 0) {
        const step = createElement('<span></span>');
        steps.append(step);
        amountSteps--;
      }
      
      steps.firstElementChild.classList.add('slider__step-active');
    }
  }

  _addСhangeSliderValue(slider, config) {
    const value = slider.querySelector('.slider__value');
    const thumb = slider.querySelector('.slider__thumb');
    const progress = slider.querySelector('.slider__progress');
    const maxSteps = config.steps - 1;

    let thumbMove;

    slider.addEventListener('click', event => {
      config.value = defineValue(event.clientX);

      value.innerHTML = config.value;
      fixedChangeProgressBar();
      changeSliderStep();
      addEventSliderChange();
    });

    thumb.addEventListener('pointerdown', () => {
      removeDefaultDnD();

      slider.classList.add('slider_dragging');

      document.addEventListener('pointermove', thumbMove = event => {
        config.value = defineValue(event.clientX);

        value.innerHTML = config.value;
        changeSliderStep();
        flexChangeProgressBar(event.clientX);
      });

      document.onpointerup = function() {
        slider.classList.remove('slider_dragging');
        
        fixedChangeProgressBar();
        addEventSliderChange();

        document.removeEventListener('pointermove', thumbMove);
        document.onpointerup = null;
      }
    });

    function removeDefaultDnD() {
      thumb.ondragstart = function() {
        return false;
      };
    }

    function defineValue(positionX) {
      const shiftX = positionX - slider.getBoundingClientRect().left;
      const sliderWidth = slider.clientWidth;
      const stepWidth = sliderWidth / maxSteps;

      const value = maxSteps - Math.round((sliderWidth - shiftX) / stepWidth);
  
      return (value < 0)        ? 0
           : (value > maxSteps) ? maxSteps
                                : value;
    }

    function flexChangeProgressBar(positionX) {
      const shiftX = positionX - slider.getBoundingClientRect().left;

      const position = (shiftX < 0)                  ? 0
                     : (shiftX > slider.clientWidth) ? slider.clientWidth
                                                     : shiftX;

      const positionPercent = calcPercent(position, slider.clientWidth);

      thumb.style.left = `${positionPercent}%`;
      progress.style.width = `${positionPercent}%`;
    }

    function fixedChangeProgressBar() {
      const sliderWidth = slider.clientWidth;
      const stepWidth = sliderWidth / maxSteps;
      const stepWidthPercent = calcPercent(stepWidth, sliderWidth);

      const position = stepWidthPercent * config.value;

      thumb.style.left = `${position}%`;
      progress.style.width = `${position}%`;
    }

    function changeSliderStep() {
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

    function calcPercent(value, maxValue) {
      return value / maxValue * 100;
    }
  }
}