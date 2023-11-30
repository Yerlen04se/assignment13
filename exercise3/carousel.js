// carousel.js
Vue.component('carousel', {
   props: {
     items: {
       type: Array,
       required: true,
     },
     autoplay: {
       type: Boolean,
       default: false,
     },
     interval: {
       type: Number,
       default: 3000, // Autoplay interval in milliseconds
     },
     showIndicators: {
       type: Boolean,
       default: true,
     },
   },
   data() {
     return {
       currentIndex: 0,
       translateValue: 0,
     };
   },
   methods: {
     next() {
       this.currentIndex = (this.currentIndex + 1) % this.items.length;
       this.translateValue = -this.currentIndex * 100;
     },
     prev() {
       this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
       this.translateValue = -this.currentIndex * 100;
     },
     goTo(index) {
       this.currentIndex = index;
       this.translateValue = -index * 100;
     },
     autoplayHandler() {
       if (this.autoplay) {
         setInterval(() => {
           this.next();
         }, this.interval);
       }
     },
   },
   mounted() {
     this.autoplayHandler();
   },
   template: `
     <div class="carousel">
       <div class="carousel-container" :style="{ transform: \`translateX(\${translateValue}%) \` }">
         <div v-for="(item, index) in items" :key="index" class="carousel-item">
           <img :src="item.src" :alt="item.alt" class="carousel-image" />
           <div v-if="item.caption" class="carousel-caption">{{ item.caption }}</div>
         </div>
       </div>
       <button @click="prev" class="carousel-control prev">❮</button>
       <button @click="next" class="carousel-control next">❯</button>
       <div v-if="showIndicators" class="indicators">
         <span v-for="(item, index) in items" :key="index" @click="goTo(index)" :class="{ active: index === currentIndex }" class="indicator"></span>
       </div>
     </div>
   `,
 });
 
 