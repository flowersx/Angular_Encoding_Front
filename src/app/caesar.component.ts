import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './apiservice';
import { FormsModule } from '@angular/forms';
import { CezarResponse } from './interfaces/cezarResponse';
import { elementAt } from 'rxjs';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-caesar',
    templateUrl: './caesar.component.html',
    styleUrls: ['./caesar.component.css'],
    standalone: true,
    imports: [RouterModule, HttpClientModule, FormsModule, NgIf, NgFor]
})
export class CaesarComponent {
    username: string | null = '';
    password: string | null = '';
    normalString: string | null = '';
    encryptedString: string = '';
    data: CezarResponse[] = [];
    constructor(private apiService: ApiService) {

    }

    ngOnInit() {
        this.password = localStorage.getItem('password');
        this.username = localStorage.getItem('username');
        if (this.username) {
            this.apiService.findCezarByUsername(this.username)
                .subscribe(response => {
                    if (response) {
                        this.data = response.map(cezarEntry => {
                            // Create a new CezarResponse object
                            const mappedEntry: CezarResponse = {
                                username: cezarEntry.username,
                                encryptedString: cezarEntry.encryptedString,
                                normalString: cezarEntry.normalString,
                            };
                            console.log(mappedEntry);
                            return mappedEntry;
                        });
                    } else {
                        console.log('No Cezar entries found for username:', this.username);
                    }
                }, error => {
                    console.error('Error fetching Cezar entries:', error);
                });
        }
    }

    saveCezarData() {
        console.log("This is the data: ", this.data);
        console.log("Normal string ", this.normalString, " Password ", this.password);
        this.encryptedString = this.encryptString(this.normalString!, this.password!)
        this.apiService.saveCezar(this.username, this.normalString, this.encryptedString)
            .subscribe(response => {
                console.log('Cezar data saved successfully:', response);
                if (this.username) {
                    this.apiService.findCezarByUsername(this.username)
                        .subscribe(response => {
                            if (response) {
                                this.data = response.map(cezarEntry => {
                                    // Create a new CezarResponse object
                                    const mappedEntry: CezarResponse = {
                                        username: cezarEntry.username,
                                        encryptedString: cezarEntry.encryptedString,
                                        normalString: cezarEntry.normalString,
                                    };
                                    console.log(mappedEntry);
                                    return mappedEntry;
                                });
                            } else {
                                console.log('No Cezar entries found for username:', this.username);
                            }
                        }, error => {
                            console.error('Error fetching Cezar entries:', error);
                        });
                }
                // Handle successful save (optional)
            }, error => {
                console.error('Error saving Cezar data:', error);
                // Handle errors (optional)
            });
    }

    encryptString(input: string, key: string): string {
        const shift = this.calculateShift(key!);
        let result = '';
        for (let i = 0; i < input!.length; i++) {
            let charCode = input!.charCodeAt(i);
            if (charCode >= 65 && charCode <= 90) {
                result += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
            } else if (charCode >= 97 && charCode <= 122) {
                result += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
            } else {
                result += input![i];
            }
        }
        return result;
    }

    private calculateShift(key: string): number {
        let sum = 0;
        for (let i = 0; i < key.length; i++) {
            sum += key.charCodeAt(i);
        }
        return sum % 26; // Se folosește restul împărțirii pentru a asigura un shift în intervalul [0, 25]
    }

}
