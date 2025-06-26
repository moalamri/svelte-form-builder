export let dndStore = store(false);

function store(init) {
          let draggingState = $state(init);

          return {
                    get isDragging() {
                              return draggingState;
                    },
                    set isDragging(value: boolean) {
                              draggingState = value;
                    }
          }
}