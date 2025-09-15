import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PreloadAllModules } from '@angular/router';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

// import guard
import { AuthGuard } from './guard/auth.guard';
import { NoAuthGuard } from './guard/no-auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            // default route → landing (dengan NoAuthGuard)
            { path: '', redirectTo: 'landing', pathMatch: 'full' },

            // layout utama (hanya bisa diakses kalau sudah login)
            {
                path: '',
                component: AppLayoutComponent,
                canActivate: [AuthGuard],
                children: [
                    { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'management-users', loadChildren: () => import('./pages-esamsat/management-users/management-users.module').then(m => m.ManagementusersModule) },
                    { path: 'setup', loadChildren: () => import('./pages-esamsat/setup/setup.module').then(m => m.SetupModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },

            // auth (login, register, dll) hanya untuk user yang belum login
            {
                path: 'auth',
                canActivate: [NoAuthGuard],
                loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule)
            },

            // landing page juga hanya untuk user yang belum login
            {
                path: 'landing',
                canActivate: [NoAuthGuard],
                loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule)
            },

            // notfound
            { path: 'notfound', component: NotfoundComponent },

            // wildcard → notfound
            { path: '**', redirectTo: '/notfound' },
        ], {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
            onSameUrlNavigation: 'reload',
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
