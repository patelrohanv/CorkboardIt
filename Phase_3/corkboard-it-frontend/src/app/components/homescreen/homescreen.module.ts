import { HomescreenComponent } from "./homescreen.component";
import { NgModule } from "@angular/core";
import { UiModule } from "src/app/ui.module";
import { CommonModule } from '@angular/common';
import { OwnedCorkboardTileComponent } from "./ownedCorkboard-tile/ownedCorkboard-tile.component";
import { RecentCorkboardTileComponent } from "./recentCorkboard-tile/recentCorkboard-tile.component";

@NgModule({
    imports: [UiModule, CommonModule],
    exports: [OwnedCorkboardTileComponent, RecentCorkboardTileComponent],
    declarations: [OwnedCorkboardTileComponent, RecentCorkboardTileComponent, HomescreenComponent],
    providers: [],
 })
 
 export class HomeScreenModule {}