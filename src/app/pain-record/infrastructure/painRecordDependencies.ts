import { createPainRecordService } from '../application/CreatePainRecordService';
import { createGetPainRecordByIdService } from '../application/GetPainRecordByIdService';
import { createGetMonthlyPainRecordsService } from '../application/GetMonthlyPainRecordsService';
import { createUpdatePainRecordService } from '../application/UpdatePainRecordService';
import { createHttpPainRecordRepository } from './HttpPainRecordRepository';

export const createPainRecordDependencies = (baseUrl: string, userId: string) => {
    const repository = createHttpPainRecordRepository(baseUrl, userId);

    return {
        repository,
        createPainRecordService: createPainRecordService(repository),
        updatePainRecordService: createUpdatePainRecordService(repository),
        getPainRecordByIdService: createGetPainRecordByIdService(repository),
        getMonthlyPainRecordsService: createGetMonthlyPainRecordsService(repository),
    };
};
