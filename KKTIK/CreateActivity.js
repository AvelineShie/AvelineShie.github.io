const organizeList = document.getElementById("organizeList");
const activitySelect = document.querySelector(".activity-select");
const newActivity = document.querySelector(".new-activity");
const newActivityRadio = document.querySelector('.new-activiy-radio');
const ActivityItem = document.getElementById("ActivityItem");
const TOSzone = document.querySelector(".TOSzone");
const establishBtn = document.querySelector(".establishBtn");


activitySelect.style.display = "none";
newActivity.style.display = "none";
TOSzone.style.display = "none";
establishBtn.style.display = "none";
    

organizeList.addEventListener("change", function() {
    if(organizeList.value == 'option1'){
         // location.reload(); 
        activitySelect.style.display = "none";
        newActivity.style.display = "none";
        TOSzone.style.display = "none";
        establishBtn.style.display = "none";
    }
    else{
    
        activitySelect.style.display = "block";
        newActivity.style.display = "block";
        TOSzone.style.display = "block";
        establishBtn.style.display = "block";
        newActivityRadio.checked = true;
    }
});

ActivityItem.addEventListener('click',()=>{
    newActivityRadio.checked = false;
});
