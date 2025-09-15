import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
          { path: 'manajemen-pengguna', loadChildren: () => import('./management-user/management-user.module').then(m => m.ManagementuserModule) },
          { path: 'kelompok-pengguna', loadChildren: () => import('./appgroupuser/appgroupuser.module').then(m => m.AppgroupuserModule) },
          { path: 'register-user', loadChildren: () => import('./register-user/register-user.module').then(m => m.RegisteruserModule) },
    ])],
    exports: [RouterModule]
})
export class ManagementusersRoutingModule { }
