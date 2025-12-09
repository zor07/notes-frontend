declare module "*.module.css";
declare module "*.svg" {
    const content: any;
    export default content;
}
declare module "*.css" {
    const content: string;
    export default content;
}