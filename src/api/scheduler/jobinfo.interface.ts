import type { AbstractPageDTO } from '@/api/core/AbstractPageDTO'
import { map } from 'lodash-es'

export interface SchedulerJobInfoDTO {
	name?: string;
	groupName?: string;
	className?: string;
	cron?: string;
	type?: number;
	jobData?: any;
	description?: string;
	sort: number;
}

export interface SchedulerJobInfoDTOPageDTO extends SchedulerJobInfoDTO, AbstractPageDTO{
}
