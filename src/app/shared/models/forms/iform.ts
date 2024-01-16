import { IField } from './field/ifield';
import { IButton } from './ibutton';

export interface IForm {
    title?: string;
    fields: IField[];
    buttons: IButton[];
    data?: any;
    id?: any;
}