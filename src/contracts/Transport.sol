// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract Transport{
     uint public  Count;
    struct Transporteur{
        
        uint cin;
        string nom;
        string prenom;
        uint tel;
        uint vehicle_number;
        uint score;
    }
    struct Product {
        uint id;
        uint adress;
        string name;
        uint poids;
        uint temperature;
        uint distance;
    }
    event ajout(
         uint cin,
        string nom,
        string prenom,
        uint tel,
        uint vehicle_number,
        uint score

    );
    mapping (uint => Transporteur) public transporteurs;
    mapping (uint => Product) public products;
    function ajout_transporteur (uint cin,string memory nom,string memory prenom,uint tel,uint vehicle_number,uint score)public{
        Count ++;
        transporteurs[Count]=Transporteur(cin,nom,prenom,tel,vehicle_number,score);
        emit ajout(cin, nom, prenom, tel, vehicle_number, score);
    }
    function get_count()public returns(uint){
        return Count;
    }
    function set_count(uint a)public{
        Count=a;
    }
    function tranporter (uint id,uint ad,string memory name, uint poids,uint temperature,uint distance)public{
        products[id]=Product(id,ad,name,poids,temperature,distance);
        uint point=0;
        if(distance <20){
             point = 10;
        }
        else if(distance <50){
            point = 25;
        }
        else {
            point =50;
        }
        
        transporteurs[ad].score=transporteurs[ad].score+(poids/100)+(point/100);
    }
    /*function get_Transporter(uint ad)public  returns (string memory,string memory,uint,uint,uint){
        return(transporteurs[ad].nom,transporteurs[ad].prenom,transporteurs[ad].tel,transporteurs[ad].vehicle_number,transporteurs[ad].score);
    }*/
}