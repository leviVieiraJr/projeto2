import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FinancasComponent } from './components/financas/financas.component';
import { EstoqueComponent } from './components/estoque/estoque.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component'; // Certifique-se de importar o AppComponent
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,      // Adicione o AppComponent aqui
    LoginComponent,
    FinancasComponent,
    EstoqueComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]   // Inicialize com AppComponent
})
export class AppModule {}
