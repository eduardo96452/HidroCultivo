package com.uteq.app_hidro_01;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.GradientDrawable;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;

import com.google.firebase.FirebaseApp;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import io.github.farshidroohi.ChartEntity;

import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.components.XAxis;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.github.mikephil.charting.utils.ColorTemplate;
import com.uteq.app_hidro_01.graphics.Cs_Medidor;

public class MainActivity_HistoricoTemperatura extends AppCompatActivity {

    private LineChart lineChart;
    FirebaseDatabase firebaseDatabase;
    DatabaseReference databaseReference;
    Cs_Medidor cs_medidor;
    ImageView retorno;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_historico_temperatura);
        lineChart = findViewById(R.id.HistoricoTemperatura_Linechart);
        retorno=findViewById(R.id.HistoricoTemperatura_ImageView_Regresar);
        retorno.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent( MainActivity_HistoricoTemperatura.this, MainActivity.class);
                startActivity(intent);
            }
        });
        inicializarFirebase();
        loadDataFromFirebase();
    }

    private void loadDataFromFirebase() {
        databaseReference = FirebaseDatabase.getInstance().getReference("HydroGrow").child("TEMPERATURA ");
        databaseReference.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                Map<String, Float> data = new HashMap<>();
                int n=0;
                for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                    if(n<20){
                        data.put(snapshot.getKey(), snapshot.getValue(Float.class));
                        n++;
                    }
                    else break;
                }
                cs_medidor=new Cs_Medidor();
                lineChart=cs_medidor.GeneratorGraphicsHistory(lineChart,data,"Temperatura");
                //setupLineChart(data);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {
                Log.e("MainActivity", "Error al cargar datos de Firebase", databaseError.toException());
            }
        });
    }

    private void  inicializarFirebase(){
        FirebaseApp.initializeApp(this);
        firebaseDatabase = FirebaseDatabase.getInstance();
        databaseReference = firebaseDatabase.getReference();
    }

}