import { useUserStore } from '@/stores/modules/user'
import type { AllListDictRes } from '@/api/system/interfaces/dict.interface'

const stores = useUserStore()
const dictList = computed(() => stores.dictList)

// 用于在 Table 中把字段的代码转换为名称，示例如下：
/*
import { getDictDataItem as di, getDictDataList as dl } from '/@/utils/dict-utils';

<el-table-column prop="字段名" label="描述" width="140">
    <template #default="scope">
    <el-tag :type="di('字典名代码', scope.row.credentialsType)?.tagType"> [{{di("字典名代码", scope.row.credentialsType)?.code}}]{{di("字典名代码", scope.row.credentialsType)?.value}} </el-tag>
    </template>
</el-table-column>
*/
export function getDictDataItem(dicName: string, dicItemCode: any): any {
	return stores.getDictItemByVal(dicName, dicItemCode)
}

// select 控件使用，用于获取字典列表，示例如下：
/*
import { getDictDataItem as di, getDictDataList as dl } from '/@/utils/dict-utils';

<el-select clearable v-model="ruleForm.字段" placeholder="请选择证件提示">
    <el-option v-for="(item,index) in  dl('字段名名码')"  :key="index" :value="item.code" :label="`[${item.code}] ${item.value}`"></el-option>
</el-select>
*/
export function getDictDataList(dicName: string): AllListDictRes[] {
	return stores.getDictDataByCode(dicName)
}
