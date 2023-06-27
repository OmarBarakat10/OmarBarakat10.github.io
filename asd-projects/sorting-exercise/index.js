/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
async function bubbleSort(array) {
    for(i = 0; i <= array.length - 1; i++){
        for(j = array.length - 1; j > i + 1; j--){
            if (array[j].value < array[j-1].value){
                swap(array, j - 1, j)
                updateCounter(bubbleCounter);
                await sleep();
            }
        }
    }
}//sorts the array by comparing 2 values. it swaps the values based on which is greater and which is less

// TODO 3: Implement quickSort

async function quickSort(array, left, right){
    if((right - left) > 0){
        var index = await partition(array, left, right)
    
        if(left < (index - 1)){
        await quickSort(array, left, index - 1)
        }
        if(index < right){
        await quickSort(array, index, right)
        }
    }
}//this is the function that quick sorts by determining what indexes are greater and what indexes are less


// TODOs 4 & 5: Implement partition

async function partition(array, left, right){
    pivot = array[Math.floor((right + left)/2)].value;
        while(left < right){
            while(array[left].value < pivot) { 
                left++ 
            }
            while(array[right].value > pivot) { 
                right-- 
            }
            if(left < right){
                swap(array, left, right);
                updateCounter(quickCounter);
                await sleep();
            }

        }
  return(left + 1);
}// this is the function that actually sorts the array by checking which values are greater nad moving left and right


// TODO 1: Implement swap

function swap(array, i, j) {
    var temp1 = array[i]
    var temp2 = array [j] //assigns i and j to temporary variables

    array[i] = temp2
    array[j] = temp1 // switches i and j by assigning to opposite variables


    drawSwap(array, i, j);
}; //the swap function that swaps 2 indexes of an array



///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}