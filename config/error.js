export class BaseError extends Error {
    constructor(data, message){
        super(message || data.message);
        this.data = data;
        if (message) {
            this.data.message = message;
        }
    }
}