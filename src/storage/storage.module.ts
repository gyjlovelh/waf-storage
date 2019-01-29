import { NgModule } from '@angular/core';
import { IndexDBService } from './service/indexdb.service';
import { LocalStorageService } from './service/localstorage.service';

@NgModule({
    imports: [],
    providers: [
        IndexDBService,
        LocalStorageService
    ]
})
export class StorageModule {}
