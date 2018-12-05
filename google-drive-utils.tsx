import { gapi } from "./gapi";

export function downloadFile(
    downloadUrl: string, /* callback: (response: any) => void*/
): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        var accessToken = gapi.auth.getToken().access_token;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.responseText);
        };
        xhr.onerror = function (error) {
            reject(error);
        };
        xhr.open('GET', downloadUrl);
        xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        xhr.send();
    });
}