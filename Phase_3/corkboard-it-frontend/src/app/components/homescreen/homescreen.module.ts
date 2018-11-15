import { CorkboardTileComponent } from "./corkboard-tile/corkboard-tile.component";
import { HomescreenComponent } from "./homescreen.component";
import { NgModule } from "@angular/core";
import { UiModule } from "src/app/ui.module";
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [UiModule, CommonModule],
    exports: [CorkboardTileComponent],
    declarations: [CorkboardTileComponent, HomescreenComponent],
    providers: [],
 })
 
 export class HomeScreenModule {}