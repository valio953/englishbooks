var date = new Date().getTime() / 1000 | 0;
var imgName = "tmpImg_" + date;

Webcam.set({
    width: 320,
    height: 240,
    dest_width: 320,
    dest_height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
});
Webcam.attach( '#my_camera' );

function take_snapshot() {
    // take snapshot and get image data
    Webcam.snap( function(data_uri) {
        // Tell the upload function where to send the dataURI
        Webcam.upload( data_uri, 'save_on_server.php?imgname=' + imgName, function(code, text) {
            //console.log("uploading snapshot to server: "+code+" "+text);
        } );

        // display results in browser window
        document.getElementById('results').innerHTML = 
            '<h2>Here is your large image:</h2>' + 
            '<img src="'+data_uri+'"/>';
            
        //console.log(data_uri);
        var img_src = location.origin + "/temp_imgs/" + imgName + ".jpg";
        console.log(img_src);
            
            $(function() {
                var params = {
                    // Request parameters
                };
                
                $.ajax({
                    url: "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?" + $.param(params),
                    beforeSend: function(xhrObj){
                        // Request headers
                        xhrObj.setRequestHeader("Content-Type","application/json");
                        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","f7c7a4984cad44d2ab73e8734a1ff233");
                    },
                    type: "POST",
                    // Request body
                    data: "{'url': '" + img_src + "'}",
                })
                .done(function(data) {
                    alert("success");
                })
                .fail(function() {
                    alert("error");
                });
            });
            
            
    } );
}