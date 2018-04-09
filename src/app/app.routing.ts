import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { GameComponent } from './game/game.component';

const appRoutes : Routes = [
    { path: '', redirectTo: 'menu', pathMatch: 'full' },
	{ path: 'menu', component: MenuComponent, data: { title: 'Main Menu'} },
	{ path: 'game', component: GameComponent, data: { title: 'Game'} },
];

export const appRoutingProviders: Array<any> = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
