import { FieldType } from './field-type.enum';
import { IFieldCompare } from './ifield-compare';
import { FieldOption } from './field-option';
import { IFieldValidation } from './ivalidation';

export interface IField {
    label: string;
    icon?: string;
    value?: any;
    type?: FieldType;
    col?: string;
    name: string;
    required: boolean;
    options?: FieldOption;
    disabled?: boolean;
    validation?: IFieldValidation;
    subSelection?: string;
    compare?: IFieldCompare | IFieldCompare[];
    parentField?: string;
    parentValue?: any;
    onChange?: any;
    title?: string;
    numValue?: boolean;
    hidden?: boolean;
}
