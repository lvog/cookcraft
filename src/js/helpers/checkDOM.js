export default Document.prototype.ready = (fn) => {
    if (fn && typeof fn === 'function') {
        document.addEventListener('DOMContentLoaded', fn);
    }
};