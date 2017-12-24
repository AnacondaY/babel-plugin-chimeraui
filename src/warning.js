export default function(path){
    return function warning(test, message){
        if(test){
            throw path.buildCodeFrameError(message);
        }
    };
}