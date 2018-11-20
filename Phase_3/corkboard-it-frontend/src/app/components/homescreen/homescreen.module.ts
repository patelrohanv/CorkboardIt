import { HomescreenComponent } from "./homescreen.component";
import { NgModule } from "@angular/core";
import { UiModule } from "src/app/ui.module";
import { CommonModule } from '@angular/common';
import { OwnedCorkboardTileComponent } from "./ownedCorkboard-tile/ownedCorkboard-tile.component";
import { RecentCorkboardTileComponent } from "./recentCorkboard-tile/recentCorkboard-tile.component";
import { PrivateLoginComponent } from './private-login/private-login.component';

@NgModule({
    imports: [UiModule, CommonModule],
    exports: [OwnedCorkboardTileComponent, RecentCorkboardTileComponent, PrivateLoginComponent],
    declarations: [OwnedCorkboardTileComponent, RecentCorkboardTileComponent, HomescreenComponent, PrivateLoginComponent],
    entryComponents: [PrivateLoginComponent]
 })
 
 export class HomeScreenModule {}