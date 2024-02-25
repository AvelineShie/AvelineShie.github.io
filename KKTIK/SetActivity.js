document.addEventListener("DOMContentLoaded", function() {
    const activityFormSelect = document.querySelector('.form-select');
    const onlineActivityElement = document.querySelector('.online-log');
    const mapElement = document.querySelector('#map').closest('div');
    const mapNote = document.querySelector('.map-note');
    const placeLog = document.querySelector('.place-log');
    hideOnlineElements();

    function hideOnlineElements() {
        onlineActivityElement.style.display = 'none';
        mapElement.style.display = 'block';
        mapNote.style.display = 'block';
        placeLog.style.display = 'block';
    }

    activityFormSelect.addEventListener('change', function() {
        var selectedValue = activityFormSelect.value;
            if (selectedValue === '實體活動') {
                hideOnlineElements();
            } 
            else {
                onlineActivityElement.style.display = 'block';
                mapElement.style.display = 'none';
                mapNote.style.display = 'none';
                placeLog.style.display = 'none';
            }
    });
});