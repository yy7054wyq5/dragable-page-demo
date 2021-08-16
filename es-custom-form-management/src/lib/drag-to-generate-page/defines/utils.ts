import { DragRow } from "../drag-to-generate-page.class";
import { ModalOptionsForService } from "ng-zorro-antd";
import { ItemConfigerComponent } from "../item-configer/item-configer.component";
import { ModalClassName } from "../config";

export function generateCellId(
  prefix: string,
  rowIndex: number,
  index: number
) {
  return `${prefix}-cell-r${rowIndex}-c${index}`;
}

export function concatCellIdsInRows(rows: DragRow[]) {
  if (rows.length) {
    return rows
      .map((row: DragRow) => {
        return row.cellIds;
      })
      .reduce((preIds: string[], crtIds: string[]) => {
        return [...preIds, ...crtIds];
      });
  }
  return [];
}

export function generateModalConfig<T = any>(options: {
  data: T;
  isHandelConfig: boolean;
  targets: T[];
  crtIndex: number;
  cb: (updatedTargets?: T[], crtData?: any, crtIndex?: number) => void;
}) {
  const targets = options.targets;
  const { isHandelConfig, crtIndex, data, cb: callBack } = options;
  const modalConfig: ModalOptionsForService = {
    nzTitle: "配置",
    nzContent: ItemConfigerComponent,
    nzComponentParams: ((d2gfi) => {
      if (isHandelConfig) {
        const tmp = JSON.parse(JSON.stringify(d2gfi));
        if (tmp.data) {
          tmp.data = JSON.stringify(tmp.data);
        }
        return { data: tmp };
      }
      return { data: d2gfi };
    })(data),
    nzOkText: "保存",
    nzClassName: ModalClassName,
    nzOnOk: (nzContentComp) => {
      const configerForm = nzContentComp.configerForm;
      // tslint:disable-next-line
      for (const key in configerForm.controls) {
        configerForm.controls[key].markAsPristine();
        configerForm.controls[key].updateValueAndValidity();
      }
      if (configerForm.invalid) {
        return false;
      }
      if (configerForm.value.data) {
        configerForm.value.data = JSON.parse(configerForm.value.data);
      }
      const pdata = {
        ...data,
        ...configerForm.value,
      };
      if (isHandelConfig) {
        targets.splice(
          crtIndex,
          1,
          Object.assign(data, configerForm.value) // 必须采用此种方式合并；拓展运算符会将实例解析为对象字面量
        );
      } else {
        targets.splice(crtIndex, 0, pdata);
      }
      callBack(targets, pdata, crtIndex);
      return true;
    },
    nzOnCancel: () => {
      if (!isHandelConfig) {
        callBack();
      }
    },
  };
  return modalConfig;
}
