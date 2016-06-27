var current_date=new Date();
var current_month=current_date.getMonth();
var current_year=current_date.getFullYear();
var current_day=current_date.getDate();


function onLoad() {

    setFooter();
    document.addEventListener("deviceready", onDeviceReady, false);
    onDeviceReady();
   
    $(".main-calendar").html(WI_Calendar(new Date()));

    $(document).on("click",".calendar-prev",function(){
    	current_month--;
    	 $(".main-calendar").html(WI_Calendar(new Date(current_year,current_month,current_day,0,0,0,0)));
    	 getEventosMes();
    });
     $(document).on("click",".calendar-next",function(){
    	current_month++;
    	 $(".main-calendar").html(WI_Calendar(new Date(current_year,current_month,current_day,0,0,0,0)));
    	 getEventosMes();
    });
getEventosMes();


$(document).on("click",".main-calendar .event",function(){
	select_day=$(this).text();
	getEventsDay(current_year+'-'+(current_month+1)+'-'+select_day);
});


}
function onDeviceReady() {

}
function WI_Calendar(currentDate){
var day_of_week = new Array('Do','Lu','Ma','Mi','Ju','Vi','Sa');
var month_of_year = new Array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');

//  DECLARE AND INITIALIZE VARIABLES
var CurrentCalendar=new Date();
var Calendar = currentDate;

var year = Calendar.getFullYear();	    // Returns year
var month = Calendar.getMonth(); //Returns month (0-11)
var today = Calendar.getDate();    // Returns day (1-31)
var weekday = Calendar.getDay();    // Returns day (1-31)

var DAYS_OF_WEEK = 7;    // "constant" for number of days in a week
var DAYS_OF_MONTH = 31;    // "constant" for number of days in a month
var cal;    // Used for printing

Calendar.setDate(1);    // Start the calendar day at '1'
Calendar.setMonth(month);    // Start the calendar month at now


/* VARIABLES FOR FORMATTING
NOTE: You can format the 'BORDER', 'BGCOLOR', 'CELLPADDING', 'BORDERCOLOR'
      tags to customize your caledanr's look. */

var TR_start = '<TR>';
var TR_end = '</TR>';
var highlight_start = '<TD class="today"><B><CENTER>';
var highlight_end   = '</CENTER></B>';
var TD_start = '<TD ><CENTER>';
var TD_end = '</CENTER></TD>';

/* BEGIN CODE FOR CALENDAR
NOTE: You can format the 'BORDER', 'BGCOLOR', 'CELLPADDING', 'BORDERCOLOR'
tags to customize your calendar's look.*/

cal =  '';
cal += '<TABLE BORDER=0 CELLSPACING=0 CELLPADDING=2>' + '<tr class="month-title">';
cal += '<td class="calendar-prev"><center><span class="glyphicon glyphicon-chevron-left"></span></center></td><TD COLSPAN="5" ><CENTER><B>';
cal += month_of_year[month]  + '   ' + year + '</B>'+  TD_end + '<td class="calendar-next"><center><span class="glyphicon glyphicon-chevron-right"></span></center></td>'+ TR_end;
cal += '<tr class="days-week">';

//   DO NOT EDIT BELOW THIS POINT  //

// LOOPS FOR EACH DAY OF WEEK
for(index=0; index < DAYS_OF_WEEK; index++)
{

// BOLD TODAY'S DAY OF WEEK
if(weekday == index)
cal += TD_start + '<B>' + day_of_week[index] + '</B>' + TD_end;

// PRINTS DAY
else
cal += TD_start + day_of_week[index] + TD_end;
}

cal += TD_end + TR_end;
cal += TR_start;

// FILL IN BLANK GAPS UNTIL TODAY'S DAY
for(index=0; index < Calendar.getDay(); index++)
cal += TD_start + '  ' + TD_end;

// LOOPS FOR EACH DAY IN CALENDAR
for(index=0; index < DAYS_OF_MONTH; index++)
{
if( Calendar.getDate() > index )
{
  // RETURNS THE NEXT DAY TO PRINT
  week_day =Calendar.getDay();

  // START NEW ROW FOR FIRST DAY OF WEEK
  if(week_day == 0)
  cal += TR_start;

  if(week_day != DAYS_OF_WEEK)
  {

  // SET VARIABLE INSIDE LOOP FOR INCREMENTING PURPOSES
  var day  = Calendar.getDate();

  // HIGHLIGHT TODAY'S DATE
  if( today==Calendar.getDate() && month==CurrentCalendar.getMonth())
  cal += highlight_start + day + highlight_end + TD_end;

  // PRINTS DAY
  else
  cal += TD_start + day + TD_end;
  }

  // END ROW FOR LAST DAY OF WEEK
  if(week_day == DAYS_OF_WEEK)
  cal += TR_end;
  }

  // INCREMENTS UNTIL END OF THE MONTH
  Calendar.setDate(Calendar.getDate()+1);

}// end for loop

cal += '</TD></TR></TABLE>';

return cal;
}

function getEventosMes(){
	   loading_show();
	 $.ajax({
                    type: "POST",
                    url: base_url+"Servicio.php?Camarasal=getFechasEventos&year="+current_year+"&month="+(current_month+1),
                    //contentType: "application/json; charset=utf-8",
                    crossDomain: true,
                    dataType: 'json',
                   
                    beforeSend: function(){
                     //   alert("start");
                    },
                    success: function (response) {
                       
                	if(response!=null){
                        for(i in response.fechaHabiles){
                            item=response.fechaHabiles[i];
                           // item.introtext=item.introtext.substring(0,80);
                           
                             $(".main-calendar table tr td").each(function(i){
                             	if($(this).text()==Number(item.day)){
                             		$(this).addClass("event");
                             	
                             	
                             	}
                             });
                        }
                    }
                        setFooter();
                        loading_hide();
                    },
                  error: function(xhr, status, error) {
                    //  var err = eval("(" + xhr.responseText + ")");
                      alert("error: "+xhr.responseText+ " | "+error +" | "+status);
                    }
                });
       return false;
}
function getEventsDay(fecha){
	loading_show();
	 $.ajax({
                    type: "POST",
                    url: base_url+"Servicio.php?Camarasal=getEventos&fechaEvento="+fecha,
                    //contentType: "application/json; charset=utf-8",
                    crossDomain: true,
                    dataType: 'json',
                   
                    beforeSend: function(){
                     //   alert("start");
                    },
                    success: function (response) {
                       $('.event-detail').html("");
             			
             			if(response!=null){
                        for(i in response.fechaHabiles){
                            item=response.fechaHabiles[i];
                         
                            $('.event-detail').append(renderEvent(item.date,item.title,item.description,item.price,item.url));
                        }
                    }
                        setFooter();
                        loading_hide();
                    },
                  error: function(xhr, status, error) {
                    //  var err = eval("(" + xhr.responseText + ")");
                      alert("error: "+xhr.responseText+ " | "+error +" | "+status);
                    }
                });
}

function renderEvent(fecha,name,description,price,url){
	var html='<div class="item-event-detail">'
					+'<div class="fecha-evento">'+fecha+'</div>'
					+'<div class="name-evento">'+name+'</div>'
					+'<div class="description-evento">'
					+description	
					+'</div>'
					+'<div class="precio">'
						+'<label class="p1">Precio</label>'
						+'<span class="price">$'+price+'</span>'
						+'<a class="reservar" target="_blank" href="javascript:openExternalBrowser(\''+site_url+url+'\')">RESERVAR</a>'
					+'</div>'
				+'</div>';
			return html;
}
function openExternalBrowser(url){
	
	navigator.app.loadUrl(url, {openExternal: true});
	//window.open(url, '_blank', 'location=yes');
}